/**
 * テーブルを作成する。何度実行しても既存のテーブルは変更しない。
 * https://12factor.net/ja/admin-processes
 */
const { pool } = require('../db');

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
];

(async () => {
  const client = await pool.connect();
  try {
    await client.query('begin');
    for (const sql of DDL) {
      await client.query(sql);
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
