'use strict';

const jwt = require('jsonwebtoken');

const login = (req, res, next) => {
  // hashing from fe? request? string?
  const { username, password } = req.body;
  // grab username/password match from db

  const test = jwt.sign({
    data: username,
  }, 'howdyGrill', {
    expiresIn: '1hr'
  });

  console.log('test', test)

  return res.sendStatus(200);

};


module.exports = (app) => {
  app.route('/login')
    .post(login);
}
