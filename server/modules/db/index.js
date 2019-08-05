const { Pool, Client } = require('pg');
const pool = new Pool();

pool.query('select now()', (err, res) => {
  pool.end();
});

