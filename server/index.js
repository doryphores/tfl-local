require('dotenv').config();

const httpServer = require('./httpServer');
const wsServer = require('./ws');
const { fetchTrainDepartures, fetchBusDepartures } = require('./api');
const STOPS = require('./stops');
const logger = require('./logger');

const BUILD_NUMBER = process.env['BUILD_NUMBER'] || 'DEV';
const CACHE = { bus: [], train: [] };
const DELAY = 20000;

const server = httpServer.start();
wsServer.start(server, () => CACHE);

logger.notice(`Started server (build number: ${BUILD_NUMBER})`);

async function updateStop(mode, stops) {
  try {
    let departures;
    const start = process.hrtime();

    if (mode === 'bus') {
      departures = await fetchBusDepartures(stops);
    } else {
      departures = await fetchTrainDepartures(stops);
    }

    const [s, ns] = process.hrtime(start);
    const requestDuration = Math.round((s + ns / 1e9) * 1000) / 1000;

    logger.debug(`Updated ${mode} departures in ${requestDuration}s`);
    CACHE[mode] = departures;
    // TODO: only send mode updates (bus or train)
    wsServer.sendToAll(CACHE);
  } catch (err) {
    logger.error(err.message);
  } finally {
    setTimeout(() => updateStop(mode, stops), DELAY);
  }
}

Object.entries(STOPS).forEach(([mode, stops]) => updateStop(mode, stops));
