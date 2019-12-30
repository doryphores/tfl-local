const fetch = require('node-fetch');
const { parse } = require('date-fns');
const Rail = require('national-rail-darwin');

const railAPI = new Rail();

const TFL_API_URL = 'https://api.tfl.gov.uk';
const TFL_APP_ID = process.env['TFL_APP_ID'];
const TFL_APP_KEY = process.env['TFL_APP_KEY'];

function timeFromRailDeparture({ std, etd }) {
  return parse(etd === 'On time' ? std : etd, 'HH:mm', new Date());
}

function departureSort(a, b) {
  if (a.time < b.time) return -1;
  if (a.time > b.time) return 1;
  return 0;
}

function fetchTrainStationDepartures(station) {
  return new Promise((resolve, reject) => {
    railAPI.getDepartureBoard(station, {}, (err, { trainServices }) => {
      if (err) return reject(err);

      resolve(
        trainServices.map((r) => ({
          id: r['serviceId'],
          line: r['operator'].replace(/^London /, ''),
          destination: r['destination']['name'],
          time: timeFromRailDeparture(r),
        })),
      );
    });
  });
}

async function fetchTrainDepartures(stations) {
  const departures = await Promise.all(stations.map(fetchTrainStationDepartures));
  return [].concat(...departures).sort(departureSort);
}

async function fetchBusStopDepartures(stop) {
  const response = await fetch(`${TFL_API_URL}/StopPoint/${stop}/Arrivals?app_id=${TFL_APP_ID}&app_key=${TFL_APP_KEY}`);
  const departures = await response.json();
  return departures.map((d) => {
    return {
      id: d['id'],
      line: d['lineName'],
      destination: d['towards'],
      time: new Date(d['expectedArrival']),
    };
  });
}

async function fetchBusDepartures(stops) {
  const departures = await Promise.all(stops.map(fetchBusStopDepartures));
  return [].concat(...departures).sort(departureSort);
}

module.exports = { fetchBusDepartures, fetchTrainDepartures };
