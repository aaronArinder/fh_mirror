'use strict';

/**
 * This file requires a common.env with the right key/value pairs to run properly. See the
 * README for more details (or talk to me over slack/discord)
 *
 * @requires common.env
 */

require('../config/env/common.env'); // env vars

/* external deps */
const cookieParser = require('cookie-parser');
const express      = require('express');
const path         = require('path');
const serveStatic  = require('serve-static');

/* route handlers */
const { loginHook }         = require('./login');
const { registrationHook }  = require('./registration');
const { formHook }          = require('./forms/crud');
const { paramsHook }        = require('./params');

const app = express();


/**
 * Set up body parsing via express.json, which uses `body-parser` underneath the hood. Currently,
 * the config options are the defaults. I'm leaving them here as a reminder of what we can do with
 * express.json().
 *
 * @property {Boolean} inflate Enables or disables handling compressed bodies; when disabled,
 *   deflated bodies are rejected.
 * @property {String} limit Controls the maximum request body size.
 * @property {Object->null} reviver This is the reviver--the second arg to JSON.parse(), which
 * can be a function for transforming the value to parse. Currently set to null
 * @property {Boolean} strict Enables or disables only accepting arrays and objects; when false,
 *   it will accept anything JSON.parse() accepts.
 * @property {String} type What media type to JSON.parse().
 * @property {Undefined} verify Currently set to `undefined`, but can be a function for
 *   verifying what's to be parsed. See the docs for call signature.
 */
app.use(express.json({
  inflate: true,
  limit: '100kb',
  reviver: null,
  strict: true,
  type: 'application/json',
  verify: undefined
}));

/**
 * cookie-parser parses the cookie header and populates req.cookies. This can have a secret
 * passed to it for supporting signed cookies.
 *
 * @function
 * @name cookieParser
 */

app.use(cookieParser());

/**
 * serve-static statically serves files.
 *
 * @function
 * @name serveStatic
 * @arg {String} The location of the directory to serve from
 * @arg {Object} An options object with one key, index, whose value is the default value for
 *   that key: the index file of the served directory.
 */

app.use(serveStatic('../dist', { index: 'index.html' }))

/**
 * Params handling
 *
 * @typedef Invocation
 * @name paramsHook
 * @arg app {Object} The express instance
 *
 */
paramsHook(app);

/**
 * Login handling. This hook also has middleware for setting app up to use cookies and passwords.
 *
 * @typedef Invocation
 * @name loginHook
 * @arg app {Object} The express instance
 *
 * @todo abstract middleware out to own directory
 */
loginHook(app);

/**
 * Registration handling.
 *
 * @typedef Invocation
 * @name loginHook
 * @arg app {Object} The express instance
 *
 * @todo abstract middleware out to own directory
 */
registrationHook(app);

/**
 * The formHook() fn hooks in a GET handler for forms
 * @typedef Invocation
 * @name formHook
 * @arg app {Object} The express instance
 */
formHook(app);

/* let 'er rip, grill */
app.listen(process.env.PORT);

