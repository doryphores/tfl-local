import EventEmitter from 'events';

export type Status = 'connected' | 'connecting' | 'disconnected';

export interface Departure {
  id: string;
  line: string;
  destination: string;
  time: Date;
}

export interface Departures {
  bus: Departure[];
  train: Departure[];
}

const SOCKET_URL = `ws://${window.location.hostname}:${process.env['REACT_APP_SERVER_PORT']}`;
const RECONNECT_DELAY = 5000;

let webSocket: WebSocket;
let reconnectionTimeout: NodeJS.Timeout;

const emitter = new EventEmitter();

export function connect(): EventEmitter {
  if (reconnectionTimeout) clearTimeout(reconnectionTimeout);
  console.debug('Connecting to web socket');

  let connectionTimeout: NodeJS.Timeout = setTimeout(() => {
    if (webSocket.readyState === 0) webSocket.close();
  }, RECONNECT_DELAY);

  webSocket = new WebSocket(SOCKET_URL);

  emitter.emit('status', 'connecting');

  webSocket.addEventListener('open', () => {
    clearTimeout(connectionTimeout);
    console.debug('Web socket connected');
    emitter.emit('status', 'connected');
  });

  webSocket.addEventListener('message', (event: MessageEvent): void => {
    console.debug('Message received');
    emitter.emit('message', JSON.parse(event.data));
  });

  webSocket.addEventListener('close', (event: CloseEvent): void => {
    console.debug('Web socket disconnected');
    emitter.emit('status', 'disconnected');
    if (webSocket.readyState < 2) webSocket.close();
    reconnectionTimeout = setTimeout(connect, RECONNECT_DELAY);
  });

  return emitter;
}
