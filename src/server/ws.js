const WebSocket = require('ws');
const CLEANUP_INTERVAL = 30 * 1000; // 30 seconds

let server;

function start(httpServer, fetchData) {
  server = new WebSocket.Server({ server: httpServer });

  server.on('connection', client => {
    client.isAlive = true;
    client.on('pong', () => (client.isAlive = true));
    client.send(JSON.stringify(fetchData()));
    console.log('Connected!');
  });

  setInterval(() => {
    server.clients.forEach(client => {
      if (!client.isAlive) return client.terminate();

      client.isAlive = false;
      client.ping();
    });
  }, CLEANUP_INTERVAL);
}

function sendToAll(data) {
  server.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) client.send(JSON.stringify(data));
  });
}

module.exports = { start, sendToAll };
