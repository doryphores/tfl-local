const WebSocket = require('ws');
const logger = require('./logger');

const CLEANUP_INTERVAL = 30 * 1000; // 30 seconds
const BUILD_NUMBER = process.env['BUILD_NUMBER'] || 'DEV';

let server;

function start(httpServer, fetchData) {
  server = new WebSocket.Server({ server: httpServer });

  server.on('connection', client => {
    client.isAlive = true;
    client.on('pong', () => (client.isAlive = true));
    sendToClient(client, fetchData());
    logger.debug('Web socket client connected');
  });

  setInterval(() => {
    server.clients.forEach(client => {
      if (!client.isAlive) {
        logger.debug('Cleaning up disconnected client');
        client.terminate();
      }

      client.isAlive = false;
      client.ping();
    });
  }, CLEANUP_INTERVAL);
}

function sendToClient(client, data) {
  client.send(
    JSON.stringify({
      buildNumber: BUILD_NUMBER,
      departureData: data,
    }),
  );
}

function sendToAll(data) {
  server.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) sendToClient(client, data);
  });
}

module.exports = { start, sendToAll };
