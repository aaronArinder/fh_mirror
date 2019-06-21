require('./env');
const db = require('./modules/db');

const express = require('express');
const path    = require('path');
const app     = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  return res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/help', (req, res) => {
  return res.sendFile(path.join(__dirname + '/public/help/index.html'));
});

app.get('/questionnaire', (req, res) => {
  return res.sendFile(path.join(__dirname + '/public/questionnaire/index.html'));
});

// do I need to serve css? manifest.json?
// material.min 404
// app.js 404
// feed.js 404
// manifest.json 404
// favicon.ico 404
//

app.listen(process.env.PORT);

