'use strict';

const jwt = require('jsonwebtoken');

//const config = require('./config');

const checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'];
  if (token.startsWith('Bearer ')) {
    // remove 'Bearer '
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, config.secret, (er, decoded) => {
      if (err) return res.status(403).send('Invalid token');
      req.decoded = decoded;
      next();
    })
  } else {
    return res.status(400).send('Authorization token required');
  }
}

module.exports = {
  checkToken,
}


