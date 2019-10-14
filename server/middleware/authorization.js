'use strict';

const { _query }      = require('../modules/db');
const bcrypt          = require('bcrypt');
const express         = require('express');
const { getPassword } = require('../users');
const jwt             = require('jsonwebtoken');
const LocalStrategy   = require('passport-local').Strategy;
const passport        = require('passport');
const passportJWT     = require('passport-jwt');

const { secret }      = process.env.secret;
const JWTStrategy     = passportJWT.Strategy;

/**
 * @todo Give reasons for why Router is being used rather than just putting it on app/api
 */
const router = express.Router();



/**
 * @todo Figure out a better way to list the strategies before the functions that they use. Only a problem for the const down there.
 */

// this method is used when a password/username is sent over on req.body
passport.use(new LocalStrategy(localStrategy));

/**
 *
 * @todo Better error-handling
 */
async function localStrategy (username, password, done) {
  try {
    const { password_hash } = await getPassword(username);
    const match = await bcrypt.compare(password, password_hash);
    if (match) return done(null, 'hooray!');
    else return done('Incorrect username and password combination');
  } catch (e) {
    console.log('err from middleware auth', e);
    return done(e);
  }
}


const jwtStrategy = {
  jwtFromRequest: req => {
    let jwt;
    if (req.headers.authorization) {
      jwt = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      jwt = req.cookies.jwt;
    }
    return jwt;
  },
  secretOrKey: process.env.secret,
}

/**
 * @todo Better error-handling
 */
function jwtStrategyCallback (jwt, done) {
  if (Date.now() > jwt.expires) return done('jwt expired');
  else return done(null, jwt);
}

// used when a jwt is passed over with cookies
passport.use(new JWTStrategy(jwtStrategy, jwtStrategyCallback));

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
    console.log('error from router', e);
    return res.sendStatus(400);
  }
}

/**
 * @todo Better error-handling
 */
function loginHandler (req, res, next) {
  passport.authenticate(
    'local',
    { session: false },
    (err, user) => {
      console.log('user', user)
      if (err || !user) return res.sendStatus(401);
      const payload = {
        username: req.body.username,
        expires: Date.now() + parseInt(process.env.JWT_EXPIRATION_MS),
      };

      return req.login(payload, { session: false }, (err) => {
        if (err) return res.sendStatus(400);
        const token = jwt.sign(JSON.stringify(payload), process.env.secret);
        res.cookie('jwt', token, { httpOnly: true, secure: true });
        return res.sendStatus(200);
      })
    },
  )(req, res, next);
}

function testAuth (req, res) {
  console.log('req.user', req.user);
  return res.sendStatus(200);
}


module.exports = {
  authorizationHook: (api) => {
    api.use(passport.initialize());
    // sort of crazy lookup fn:
    // passport-local: lib/utils.js
    // https://github.com/jaredhanson/passport-local/blob/master/lib/utils.js
    passport.use(new LocalStrategy({
      usernameField: 'payload[]username',
      passwordField: 'payload[]password',
    }, localStrategy));
    passport.use(new JWTStrategy(jwtStrategy, jwtStrategyCallback));

    router.post('/register', registrationHandler);
    router.post('/login', loginHandler);
    router.get('/test-auth', passport.authenticate('jwt', { session: false }), testAuth);

    api.use(router);
  }
}
