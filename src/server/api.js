const fetch = require('node-fetch');
const { parse, differenceInMinutes } = require('date-fns');
const Rail = require('national-rail-darwin');

const railAPI = new Rail();

const TFL_API_URL = 'https://api.tfl.gov.uk';
const TFL_APP_ID = process.env['TFL_APP_ID'];
const TFL_APP_KEY = process.env['TFL_APP_KEY'];

function timeFromRailDeparture({ std, etd }) {
  return parse(etd === 'On time' ? std : etd, 'HH:mm', new Date());
}

function departureSortFunction(a, b) {
  if (a.time < b.time) return -1;
  if (a.time > b.time) return 1;
  return 0;
}

function concatAndSort(departures) {
  return [].concat(...departures).sort(departureSortFunction);
}

function fetchTrainStationDepartures({ station, minutesToStation }) {
  const now = new Date();
  return new Promise((resolve, reject) => {
    railAPI.getDepartureBoard(station, {}, (err, { trainServices }) => {
      if (err) return reject(err);

      resolve(
        trainServices
          .map((r) => ({
            id: r['serviceId'],
            line: r['operator'].replace(/^London /, ''),
            destination: r['destination']['name'],
            time: timeFromRailDeparture(r),
          }))
          .filter((d) => differenceInMinutes(d.time, now) >= minutesToStation),
      );
    });
  });
}

async function fetchTrainDepartures(stations) {
  const departures = await Promise.all(stations.map(fetchTrainStationDepartures));
  return concatAndSort(departures);
}

async function fetchBusStopDepartures({ stop, minutesToStop }) {
  const response = await fetch(`${TFL_API_URL}/StopPoint/${stop}/Arrivals?app_id=${TFL_APP_ID}&app_key=${TFL_APP_KEY}`);
  const departures = await response.json();
  const now = new Date();
  return departures
    .map((d) => ({
      id: d['id'],
      line: d['lineName'],
      destination: `${d['towards']} ➤ ${d['destinationName']}`,
      time: new Date(d['expectedArrival']),
    }))
    .filter((d) => differenceInMinutes(d.time, now) >= minutesToStop);
}

async function fetchBusDepartures(stops) {
  const departures = await Promise.all(stops.map(fetchBusStopDepartures));
  return concatAndSort(departures);
}

module.exports = { fetchBusDepartures, fetchTrainDepartures };
