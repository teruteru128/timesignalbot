
import assert from 'assert';

// https://devcenter.heroku.com/ja/articles/getting-started-with-nodejs?singlepage=true#-13
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
describe('DB Connection test', suite => {
    new Promise(async (resolve, reject) => {
      // https://node-postgres.com/
      const client = await pool.connect();
      try {
        const result = await client.query('SELECT $1::text as message', ['Hello world!']);
        assert.equal(result.rows[0].message, 'Hello world!'); // Hello world!
        /* const result = await client.query('SELECT $1::text', ['Hello world!']);
        console.log(result.rows[0]); // Hello world! */
        /* const result = await client.query('SELECT $1', ['Hello world!']);
        console.log(result.rows[0]); // Hello world! */
        resolve();
      } catch (error) {
        reject(error);
      } finally {
        client.release();
      }
    }).catch(err => console.error("pg error : %s", err));
});
