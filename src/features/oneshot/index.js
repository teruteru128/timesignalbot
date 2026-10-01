/**
 * ワンショット時報
 * 予約は oneshot_signals テーブルに保存し、起動時に未送信の分を読み込んでタイマーを張り直す。
 */
const { MessageFlags, PermissionFlagsBits } = require('discord.js');

const { memberCan } = require('../permissions');
const { KeyedTimers } = require('./KeyedTimers');
const { parseJstDateTime } = require('./parseDateTime');

// 停止中に送信時刻を過ぎた予約を、起動時に遅れて送る猶予
const GRACE_SECONDS = 5 * 60;
const LIST_LIMIT = 20;
const PREVIEW_LENGTH = 40;

// 予約の作成・取り消しに必要な、送信先チャンネルでの実行者の権限
const MEMBER_PERMISSIONS = [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages];

const toUnix = (date) => Math.floor(date.getTime() / 1000);

/**
 * 送信するメッセージのオプションを作る。
 * @everyone・@here・ロールへの通知は、予約時に明示的に許可された場合だけ飛ばす
 * (2025年1月に便器ロールへの誤爆で大惨事になったことがある)
 */
function buildMessageOptions(content, massMentions) {
  return {
    content,
    allowedMentions: { parse: massMentions ? ['users', 'roles', 'everyone'] : ['users'] },
  };
}

function createOneshotSignals({ client, pool, logger }) {
  const timers = new KeyedTimers();

  async function fire(id) {
    // 取り消しと競合しても二重送信しないよう、送信済みにできた場合だけ送る
    const { rows } = await pool.query(
      `update oneshot_signals set status = 'sent', sent_at = now()
        where id = $1 and status = 'pending'
        returning channel_id, content, mass_mentions`,
      [id],
    );
    if (rows.length === 0) {
      return;
    }
    const { channel_id: channelId, content, mass_mentions: massMentions } = rows[0];
    try {
      const channel = await client.channels.fetch(channelId);
      if (channel === null || !channel.isTextBased()) {
        throw new Error(`channel ${channelId} is not a text channel`);
      }
      await channel.send(buildMessageOptions(content, massMentions));
      logger.info('sent oneshot signal #%s to %s', id, channelId);
    } catch (error) {
      logger.error(error, 'failed to send oneshot signal #%s', id);
      await pool.query("update oneshot_signals set status = 'failed' where id = $1", [id]);
    }
  }

  function arm(id, sendAt) {
    timers.set(String(id), sendAt, () => {
      fire(id).catch((error) => logger.error(error, 'oneshot signal #%s', id));
    });
  }

  async function restore() {
    const missed = await pool.query(
      `update oneshot_signals set status = 'missed'
        where status = 'pending' and send_at < now() - make_interval(secs => $1)
        returning id`,
      [GRACE_SECONDS],
    );
    missed.rows.forEach(({ id }) => logger.warn('oneshot signal #%s was missed', id));
    const { rows } = await pool.query(
      "select id, send_at from oneshot_signals where status = 'pending'",
    );
    rows.forEach(({ id, send_at: sendAt }) => arm(id, sendAt));
    logger.info('restored %d oneshot signal(s)', rows.length);
  }

  async function add(interaction) {
    const text = interaction.options.getString('datetime', true);
    const content = interaction.options.getString('content', true);
    const channel = interaction.options.getChannel('channel') ?? interaction.channel;
    const massMentions = interaction.options.getBoolean('mass_mentions') ?? false;

    const sendAt = parseJstDateTime(text);
    if (sendAt === null) {
      return `日時 \`${text}\` を読み取れませんでした。\`2026-12-31 23:59:59\` のように日本時間で指定してください。`;
    }
    if (sendAt.getTime() <= Date.now()) {
      return `<t:${toUnix(sendAt)}:F> はすでに過ぎています。`;
    }
    if (channel === null || !channel.isTextBased()) {
      return '送信先にはテキストチャンネルを指定してください。';
    }
    const permissions = channel.permissionsFor(interaction.client.user);
    if (!permissions?.has([PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages])) {
      return `${channel} にメッセージを送信する権限がありません。`;
    }
    if (!memberCan(interaction, channel, MEMBER_PERMISSIONS)) {
      return `あなたには ${channel} にメッセージを送信する権限がないため、予約できません。`;
    }
    if (massMentions && !memberCan(interaction, channel, PermissionFlagsBits.MentionEveryone)) {
      return `あなたには ${channel} で @everyone・@here・すべてのロールにメンションする権限がないため、mass_mentions は指定できません。`;
    }

    const { rows } = await pool.query(
      `insert into oneshot_signals (send_at, guild_id, channel_id, content, created_by, mass_mentions)
        values ($1, $2, $3, $4, $5, $6)
        returning id`,
      [sendAt, interaction.guildId, channel.id, content, interaction.user.id, massMentions],
    );
    const { id } = rows[0];
    arm(id, sendAt);
    const reply = `#${id} を予約しました: <t:${toUnix(sendAt)}:F> (<t:${toUnix(sendAt)}:R>) に ${channel} へ送信します。`;
    return massMentions
      ? `${reply}\n📢 **送信時に @everyone・@here・ロールへの通知が飛びます。** 不要なら \`/signal oneshot cancel id:${id}\` で取り消してください。`
      : reply;
  }

  async function list(interaction) {
    const { rows } = await pool.query(
      `select id, send_at, channel_id, content, mass_mentions from oneshot_signals
        where guild_id = $1 and status = 'pending'
        order by send_at`,
      [interaction.guildId],
    );
    // 実行者が見られないチャンネルあての予約は、文面ごと隠す
    const visible = rows.filter(({ channel_id: channelId }) => {
      const channel = interaction.guild.channels.cache.get(channelId);
      return channel === undefined || memberCan(interaction, channel, PermissionFlagsBits.ViewChannel);
    });
    if (visible.length === 0) {
      return '予約中のワンショット時報はありません。';
    }
    return visible.slice(0, LIST_LIMIT).map(({
      id, send_at: sendAt, channel_id: channelId, content, mass_mentions: massMentions,
    }) => {
      const preview = content.length > PREVIEW_LENGTH ? `${content.slice(0, PREVIEW_LENGTH)}…` : content;
      return `#${id} <t:${toUnix(sendAt)}:F> <#${channelId}> ${massMentions ? '📢 ' : ''}${preview.replaceAll('\n', ' ')}`;
    }).join('\n');
  }

  async function cancel(interaction) {
    const id = interaction.options.getInteger('id', true);
    const notFound = `#${id} は予約中のワンショット時報の中に見つかりませんでした。`;
    const reservation = await pool.query(
      "select channel_id from oneshot_signals where id = $1 and guild_id = $2 and status = 'pending'",
      [id, interaction.guildId],
    );
    if (reservation.rows.length === 0) {
      return notFound;
    }
    // 送信先のチャンネルが削除済みなら、守るものがないので取り消しを認める
    const channel = interaction.guild.channels.cache.get(reservation.rows[0].channel_id);
    if (channel !== undefined && !memberCan(interaction, channel, MEMBER_PERMISSIONS)) {
      // 見られないチャンネルあての予約は、存在も明かさない
      return memberCan(interaction, channel, PermissionFlagsBits.ViewChannel)
        ? `あなたには ${channel} にメッセージを送信する権限がないため、取り消せません。`
        : notFound;
    }
    const { rows } = await pool.query(
      `update oneshot_signals set status = 'canceled'
        where id = $1 and guild_id = $2 and status = 'pending'
        returning id`,
      [id, interaction.guildId],
    );
    if (rows.length === 0) {
      return notFound;
    }
    timers.clear(String(id));
    return `#${id} を取り消しました。`;
  }

  const SUBCOMMANDS = { add, list, cancel };

  async function handleInteraction(interaction) {
    if (!interaction.inGuild()) {
      await interaction.reply({ content: 'サーバー内で実行してください。', flags: MessageFlags.Ephemeral });
      return;
    }
    const subcommand = SUBCOMMANDS[interaction.options.getSubcommand()];
    let content;
    try {
      content = await subcommand(interaction);
    } catch (error) {
      logger.error(error, 'oneshot command failed');
      content = 'エラーが発生しました。';
    }
    // 予約一覧の本文に含まれるメンションで通知が飛ばないようにする
    await interaction.reply({ content, flags: MessageFlags.Ephemeral, allowedMentions: { parse: [] } });
  }

  return { restore, handleInteraction };
}

module.exports.createOneshotSignals = createOneshotSignals;
module.exports.buildMessageOptions = buildMessageOptions;
