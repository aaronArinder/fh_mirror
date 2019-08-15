require('../config/env/common.env'); // env vars

'use strict';
const bcrypt = require('bcrypt');
const db = require('./modules/db');
const express      = require('express');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const path         = require('path');
const jwt = require('jsonwebtoken');
const serveStatic  = require('serve-static');

//const fs = require('fs');
//const jwt = require('jsonwebtoken');
//const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
//const bcrypt = require('bcrypt');
const { getPassword } = require('./ORM/users');

const { secret } = process.env.secret; // ooo la la

// used with req.body
passport.use(new LocalStrategy(
async (username, password, done) => {
  try {
    const { password_hash } = await getPassword(username);
    const match = await bcrypt.compare(password, password_hash);
    if (match) return done(null, 'hooray!');
    else return done('Incorrect username and password combination');
  } catch (e) {
    console.log('err from middleware auth', e);
    return done(e);
  }
}));

// used with cookies
passport.use(new JWTStrategy({
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
}, (jwt, done) => {
  console.log('jwt.expires', jwt.expires)
  if (Date.now() > jwt.expires) return done('jwt expired');
  else return done(null, jwt);
}

))

const router = express.Router();

router.post('/register', async (req, res, next) => {
  const { username, password } = req.body;
  // approx 13 seconds
  const hashCost = 10;

  try {
    const passwordHash = await bcrypt.hash(password, hashCost);
    return res.sendStatus(200);
  } catch (e) {
    console.log('error from router', e);
    return res.sendStatus(400);
  }
});

router.post('/login', (req, res) => {
  passport.authenticate(
    'local',
    { session: false },
    (err, user) => {
      if (err || !user) return res.sendStauts(400);
      const payload = {
        // bad
        username: 'aaron',
        // do this
        expires: Date.now() + parseInt(process.env.JWT_EXPIRATION_MS),
      };
      return req.login(payload, { session: false }, (err) => {
        if (err) return res.sendStatus(400);
        const token = jwt.sign(JSON.stringify(payload), process.env.secret);
        res.cookie('jwt', token, { httpOnly: true, secure: true });
        return res.sendStatus(200);
      })
    },
  )(req, res);
});

router.get('/test-auth', passport.authenticate('jwt', { session: false }), (req, res) => {
  // might not be on user? no idea
  console.log('req.user', req.user);
  return res.sendStatus(200);
})

// use https server
const app          = express();


// uses body-parser underneath the hood
// these are the default options; leaving here
// as a reminder to follow up on them
app.use(express.json({
  inflate: true,
  limit: '100kb',
  reviver: null,
  strict: true,
  type: 'application/json',
  verify: undefined
}))

app.use(cookieParser());

//require(__dirname + '/authorization/login')(app);
//app.use(express.static(__dirname + '../dist'));
app.use('/', serveStatic(__dirname + '../dist'));

//app.use(serveStatic('public/ftp', { 'index': ['default.html', 'default.htm'] }))
app.use(serveStatic('../dist', { 'index': ['index.html'] }))

//app.get('/', (req, res) => {
//  return res.sendFile(path.join(__dirname + '/../dist/index.html'));
//});

app.use(router);
app.listen(process.env.PORT);

