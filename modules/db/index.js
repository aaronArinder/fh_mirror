const { Pool, Client } = require('pg');
const pool = new Pool();

pool.query('select now()', (err, res) => {
  console.log(err, res);
  pool.end();
});

