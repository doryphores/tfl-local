const express = require('express');
const path = require('path');

const app = express();
const assetPath = path.join(__dirname, '../build');

app.use(express.static(assetPath));

app.get('/', function(_req, res) {
  res.sendFile(path.join(assetPath, 'index.html'));
});

function start() {
  return app.listen(process.env['SERVER_PORT']);
}

module.exports = { start };
