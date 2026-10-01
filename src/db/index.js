/**
 * PostgreSQL 接続プール
 *
 * 接続先は pg の標準の環境変数 (PGHOST, PGDATABASE, PGUSER など) で指定する。
 * 同じマシンの PostgreSQL に peer 認証で接続する場合の例:
 *   PGHOST=/var/run/postgresql
 *   PGDATABASE=timesignalbot
 * DATABASE_URL が設定されている場合はそちらを優先する。
 * https://node-postgres.com/features/connecting
 */
const { Pool } = require('pg');

const pool = process.env.DATABASE_URL
  ? new Pool({ connectionString: process.env.DATABASE_URL })
  : new Pool();

module.exports.pool = pool;
