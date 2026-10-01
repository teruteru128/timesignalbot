/**
 * 定常の時報
 * 送信先は signal_channels テーブルで管理し、/signal register|unregister|list で変更する。
 */
const { MessageFlags, PermissionFlagsBits } = require('discord.js');

const { buildSignal } = require('../../modules/signalbuilder');
const { memberCan } = require('../permissions');

function createTimeSignal({ client, pool, logger }) {
  async function send(ctx) {
    const body = buildSignal(ctx);
    const { rows } = await pool.query('select channel_id from signal_channels');
    // 1つのチャンネルで失敗しても、ほかのチャンネルには送る
    const results = await Promise.allSettled(rows.map(async ({ channel_id: channelId }) => {
      const channel = await client.channels.fetch(channelId);
      if (channel === null || !channel.isTextBased()) {
        throw new Error(`channel ${channelId} is not a text channel`);
      }
      await channel.send(body);
    }));
    results.forEach((result, i) => {
      if (result.status === 'rejected') {
        logger.error(result.reason, 'failed to send time signal to %s', rows[i].channel_id);
      }
    });
    const sent = results.filter((result) => result.status === 'fulfilled').length;
    logger.info('sent time signal to %d/%d channel(s)', sent, rows.length);
  }

  async function register(interaction) {
    const channel = interaction.options.getChannel('channel') ?? interaction.channel;
    if (channel === null || !channel.isTextBased()) {
      return '送信先にはテキストチャンネルを指定してください。';
    }
    const permissions = channel.permissionsFor(interaction.client.user);
    if (!permissions?.has([PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages])) {
      return `${channel} にメッセージを送信する権限がありません。`;
    }
    if (!memberCan(interaction, channel, PermissionFlagsBits.ManageChannels)) {
      return `あなたには ${channel} のチャンネル管理の権限がないため、登録できません。`;
    }
    const { rows } = await pool.query(
      `insert into signal_channels (channel_id, guild_id, created_by)
        values ($1, $2, $3)
        on conflict (channel_id) do nothing
        returning channel_id`,
      [channel.id, interaction.guildId, interaction.user.id],
    );
    if (rows.length === 0) {
      return `${channel} はすでに時報の送信先です。`;
    }
    return `${channel} を時報の送信先に登録しました。`;
  }

  async function unregister(interaction) {
    const channel = interaction.options.getChannel('channel') ?? interaction.channel;
    if (!memberCan(interaction, channel, PermissionFlagsBits.ManageChannels)) {
      return `あなたには ${channel} のチャンネル管理の権限がないため、外せません。`;
    }
    const { rows } = await pool.query(
      'delete from signal_channels where channel_id = $1 and guild_id = $2 returning channel_id',
      [channel.id, interaction.guildId],
    );
    if (rows.length === 0) {
      return `${channel} は時報の送信先ではありません。`;
    }
    return `${channel} を時報の送信先から外しました。`;
  }

  async function list(interaction) {
    const { rows } = await pool.query(
      'select channel_id from signal_channels where guild_id = $1 order by created_at',
      [interaction.guildId],
    );
    // 実行者が見られないチャンネルは表示しない
    const visible = rows.filter(({ channel_id: channelId }) => {
      const channel = interaction.guild.channels.cache.get(channelId);
      return channel === undefined || memberCan(interaction, channel, PermissionFlagsBits.ViewChannel);
    });
    if (visible.length === 0) {
      return 'このサーバーには時報の送信先がありません。';
    }
    return ['このサーバーの時報の送信先:', ...visible.map(({ channel_id: channelId }) => `<#${channelId}>`)].join('\n');
  }

  const SUBCOMMANDS = { register, unregister, list };

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
      logger.error(error, 'signal command failed');
      content = 'エラーが発生しました。';
    }
    await interaction.reply({ content, flags: MessageFlags.Ephemeral, allowedMentions: { parse: [] } });
  }

  return { send, handleInteraction };
}

module.exports.createTimeSignal = createTimeSignal;
