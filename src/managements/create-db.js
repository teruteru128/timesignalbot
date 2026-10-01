/**
 * テーブルを作成する。何度実行しても既存のテーブルは変更しない。
 * https://12factor.net/ja/admin-processes
 */
const { pool } = require('../db');
const { CHANNELS, GUILDS } = require('../constants');

const DDL = [
  // 地雷
  `create table if not exists mines (
    mine varchar(128) primary key,
    comment text
  )`,
  // ワンショット時報
  `create table if not exists oneshot_signals (
    id bigint generated always as identity primary key,
    send_at timestamptz not null,
    guild_id varchar(24) not null,
    channel_id varchar(24) not null,
    content text not null,
    created_by varchar(24) not null,
    created_at timestamptz not null default now(),
    status text not null default 'pending'
      check (status in ('pending', 'sent', 'failed', 'canceled', 'missed')),
    sent_at timestamptz
  )`,
  `create index if not exists oneshot_signals_pending_idx
    on oneshot_signals (send_at) where status = 'pending'`,
  // @everyone・@here・ロールへの通知を許可するか。後から追加した列なので alter で足す
  `alter table oneshot_signals
    add column if not exists mass_mentions boolean not null default false`,
  // 定常の時報の送信先
  `create table if not exists signal_channels (
    channel_id varchar(24) primary key,
    guild_id varchar(24) not null,
    created_by varchar(24),
    created_at timestamptz not null default now()
  )`,
];

// DB 管理にする前にコードで指定していた送信先。created_by は null にする
const INITIAL_SIGNAL_CHANNELS = [
  [CHANNELS.TAMOKUTEKI_TOIRE_TEXT_CHANNEL_ID, GUILDS.TAMOKUTEKI_TOIRE_GUILD_ID],
  [CHANNELS.PUBLIC_SERVER_ZATSUDAN_CHANNEL_ID, GUILDS.FARM_PUBLIC_SERVER_GUILD_ID],
];

(async () => {
  const client = await pool.connect();
  try {
    await client.query('begin');
    // unregister したチャンネルが復活しないよう、初期データはテーブルを作ったときだけ入れる
    const { rows } = await client.query("select to_regclass('signal_channels') is null as missing");
    for (const sql of DDL) {
      await client.query(sql);
    }
    if (rows[0].missing) {
      for (const [channelId, guildId] of INITIAL_SIGNAL_CHANNELS) {
        await client.query(
          'insert into signal_channels (channel_id, guild_id) values ($1, $2)',
          [channelId, guildId],
        );
      }
      console.log('Inserted %d initial signal channel(s).', INITIAL_SIGNAL_CHANNELS.length);
    }
    await client.query('commit');
    console.log('Done create-db.');
  } catch (error) {
    await client.query('rollback');
    console.error('pg error : %s', error);
    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
})();
