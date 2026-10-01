/**
 * 環境変数 MINES (| 区切り) の地雷を mines テーブルに登録する。登録済みのものは無視する。
 * https://12factor.net/ja/admin-processes
 */
const { pool } = require('../db');

(async () => {
  const mines = (process.env.MINES ?? '').split('|').filter((mine) => mine.length > 0);
  try {
    const results = await Promise.all(mines.map((mine) => pool.query(
      'insert into mines (mine) values ($1) on conflict (mine) do nothing',
      [mine],
    )));
    const inserted = results.reduce((sum, result) => sum + result.rowCount, 0);
    console.log('Inserted %d of %d mine(s).', inserted, mines.length);
  } catch (error) {
    console.error('pg error : %s', error);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
})();
