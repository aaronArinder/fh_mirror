require('./env');

const express = require('express');
const path    = require('path');

const app     = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.listen(process.env.port || 8080);

