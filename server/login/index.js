'use strict';

const bcrypt          = require('bcrypt');
const { getPassword } = require('../users');
const jwt             = require('jsonwebtoken');
const LocalStrategy   = require('passport-local').Strategy;
const passport        = require('passport');
const passportJWT     = require('passport-jwt');

const { secret }      = process.env.secret;
const JWTStrategy     = passportJWT.Strategy;


/**
 * @name exports
 * @type {Object}
 *
 * @todo break out middleware into own directory
 */
module.exports = {
  loginHook: (app) => {
    app.use(passport.initialize());

    // sort of crazy lookup fn:
    // passport-local: lib/utils.js -- only util fn in file
    // https://github.com/jaredhanson/passport-local/blob/master/lib/utils.js

    passport.use(new LocalStrategy({
      usernameField: 'payload[]username',
      passwordField: 'payload[]password',
    }, localStrategy));

    passport.use(new JWTStrategy(jwtStrategy(), jwtStrategyCallback));

    app.post('/login', loginHandler);
    app.get('/test-auth', passport.authenticate('jwt', { session: false }), testAuth);
  }
}


/**
 * @todo Better error-handling
 */
async function localStrategy (username, password, done) {
  try {
    const { password_hash } = await getPassword(username);
    const match = await bcrypt.compare(password, password_hash);
    if (match) return done(null, 'hooray!');
    else return done('Incorrect username and password combination');
  } catch (e) {
    console.log('err from localStrategy()', e);
    return done(e);
  }
}


function jwtStrategy () {
  return {
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
}

/**
 * @todo Better error-handling
 */
function jwtStrategyCallback (jwt, done) {
  if (Date.now() > jwt.expires) return done('jwt expired');
  else return done(null, jwt);
}

/**
 * @todo Better error-handling
 */
async function loginHandler (req, res, next) {
  passport.authenticate(
    'local',
    { session: false },
    (err, user) => {
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

/**
 * Dummy route for testing jwt tokens with curl
 *
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 *
 * @todo get cookies working for the rest of the app
 */
function testAuth (req, res) {
  console.log('req.user', req.user);
  return res.sendStatus(200);
}


