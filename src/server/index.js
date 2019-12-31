require('dotenv').config();

const httpServer = require('./httpServer');
const wsServer = require('./ws');
const { fetchTrainDepartures, fetchBusDepartures } = require('./api');
const STOPS = require('./stops');

const CACHE = {};
const DELAY = 10000;

const server = httpServer.start();
wsServer.start(server, () => CACHE);

async function updateStop(mode, stops) {
  let departures;

  try {
    if (mode === 'bus') {
      departures = await fetchBusDepartures(stops);
    } else {
      departures = await fetchTrainDepartures(stops);
    }

    console.log('=> Updated', mode);
    CACHE[mode] = departures;
    wsServer.sendToAll(CACHE);
  } finally {
    setTimeout(() => updateStop(mode, stops), DELAY);
  }
}

for (let [mode, stops] of Object.entries(STOPS)) {
  updateStop(mode, stops);
}
