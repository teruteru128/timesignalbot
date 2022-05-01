
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
  const promises = [];
  try {
    //地雷
    // mine unique not null (primary key?)
    // guild 不必要？
    // comment
    // create table mines();
    
    process.env.MINE.split(',').reduce((promises, element) => {
      promises.push(client.query('insert into mine(mine, comment) values ($1::text, "");', mine));
    }, promises);
    //ギルド(サーバー)
    // create table guilds;
    resolve(Promise.allSettled(promises));
  } catch (error) {
    console.error(error);
    reject(error);
  } finally {
    client.release();
  }
}).catch(err => console.error('pg error : %s', err));
