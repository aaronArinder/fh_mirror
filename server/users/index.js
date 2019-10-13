'use strict';

const { _query } = require('../modules/db');

// TODO: should use stored procedures
module.exports = {
  getPassword: (username) => _query('select password_hash from users where username = $1', [ username ]),
};

