require('dotenv').config();

const WebSocket = require('ws');
const { fetchTrainDepartures, fetchBusDepartures } = require('./api');
const STOPS = require('./stops');

const CACHE = {};
const DELAY = 10000;

async function updateStop(mode, stops) {
  let departures;
  if (mode === 'bus') {
    departures = await fetchBusDepartures(stops);
  } else {
    departures = await fetchTrainDepartures(stops);
  }
  CACHE[mode] = departures;
  console.log('=> Updated', mode);

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(CACHE));
    }
  });

  setTimeout(() => updateStop(mode, stops), DELAY);
}

const wss = new WebSocket.Server({ port: 8080 });

Object.entries(STOPS).forEach((entry) => updateStop(...entry));

wss.on('connection', function connection(ws) {
  ws.send(JSON.stringify(CACHE));
  console.log('Connected!');
});
