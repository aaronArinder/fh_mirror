const { Pool } = require('pg');
const pool = new Pool();


module.exports = {
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

