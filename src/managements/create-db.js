
/**
 * https://12factor.net/ja/admin-processes
 * https://devcenter.heroku.com/ja/articles/management-visibility
 */
console.log('Hello create-db!');
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
new Promise(async (resolve, reject) => {
  // https://node-postgres.com/
  const client = await pool.connect();
  try {
    //地雷
    // mine unique not null (primary key?)
    // guild 不必要？
    // comment
    // create table mines();
    await client.query('create table if not exists mines (mine varchar(128), comment text, primary key mine_pk(mine))');
    //ギルド(サーバー)
    // create table guilds;
    resolve();
  } catch (error) {
    console.error(error);
    reject(error);
  } finally {
    client.release();
  }
}).catch(err => console.error('pg error : %s', err));
