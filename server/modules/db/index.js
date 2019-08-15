const { Pool, Client } = require('pg');
const pool = new Pool();

//pool.query('select now()', (err, res) => {
//  pool.end();
//});

module.exports = {
  // connect?
  _query: async (text, values) => {
    const client = await pool.connect();
    try {
      const data = await client.query(text, values);
      return data.rows[0];
    } catch (e) {
      console.log('whoops! error from db call: ', e);
    } finally {
      client.release();
    }
  }
}

