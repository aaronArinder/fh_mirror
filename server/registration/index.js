'use strict';

const { _query }      = require('../modules/db');
const bcrypt          = require('bcrypt');


module.exports = {
  registrationHook: (app) => {
    app.post('/register', registrationHandler);
  },
}

/**
 * @todo Better error-handling
 */
async function registrationHandler (req, res, next) {
  const payload = req.body.payload;
  const userData = payload.reduce((userObj, { name, model }) => {
    userObj[name] = model;
    return userObj;
  }, {});

  const {
    first_name,
    last_name,
    dob,
    sex,
    username,
    new_password
  } = userData;

  const hashCost = 10; // approx 13 seconds

  try {
    const passwordHash = await bcrypt.hash(new_password, hashCost);

    const insertUser = `
      insert into users (first_name, last_name, dob, sex, username, password_hash)
      values ($1, $2, $3, $4, $5, $6)
    `;

    await _query(insertUser, [
      first_name,
      last_name,
      dob,
      sex,
      username,
      passwordHash
    ]);

    return res.sendStatus(200);
  } catch (e) {
    console.log('error from registrationHandler()', e);
    return res.sendStatus(400);
  }
}
