const express = require('express');
const app     = express();
const PORT    = 8080;

const path    = require('path');

// serve static files in /public/
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

app.listen(PORT);

