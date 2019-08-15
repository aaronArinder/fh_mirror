'use strict';

const fs = require('fs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const bcrypt = require('bcrypt');
const { getPassword } = require('../ORM/users');

const { secret } = process.env.secret; // ooo la la

// used with req.body
passport.use(new LocalStrategy({
  usernameField: username,
  passwordField: password,
}, async (username, password, done) => {
  try {
    const password_hash = await getPassword(username);
    const match = await bcrypt.compare(password, password_hash);
    if (match) return done(nuull, 'hooray!');
    else return done('Incorrect username and password combination');
  } catch (e) {
    console.log('err from middleware auth', e);
    return done(e);
  }
}));

// used with cookies
password.use(new JWTStrategy({
  jwtFromRequest: req => req.cookies.jwt,
  secretOrKey: secret,
}, (jwt, done) => {
  if (Date.now() > jwt.expires) return done('jwt expired');
  else return done(null, jwt);
}

))


//const privateKey = fs.readFileSync('./private.key')
