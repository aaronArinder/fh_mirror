require('../config/env/common.env'); // env vars
const db = require('./modules/db');

const express      = require('express');
const path         = require('path');
const serveStatic  = require('serve-static');
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

require(__dirname + '/authorization/login')(app);
//app.use(express.static(__dirname + '../dist'));
app.use('/', serveStatic(__dirname + '../dist'));

//app.use(serveStatic('public/ftp', { 'index': ['default.html', 'default.htm'] }))
app.use(serveStatic('../dist', { 'index': ['index.html'] }))

//app.get('/', (req, res) => {
//  return res.sendFile(path.join(__dirname + '/../dist/index.html'));
//});

app.listen(process.env.PORT);

