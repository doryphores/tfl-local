const SOCKET_URL = `ws://${window.location.hostname}:${process.env['REACT_APP_SERVER_PORT']}`;
const RECONNECT_DELAY = 5000;

let webSocket: WebSocket;
let reconnectionTimeout: NodeJS.Timeout;

export function connect(callback: (msg: any) => void): void {
  if (reconnectionTimeout) clearTimeout(reconnectionTimeout);
  console.debug('Connecting to web socket');

  let connectionTimeout: NodeJS.Timeout = setTimeout(() => {
    if (webSocket.readyState === 0) webSocket.close();
  }, RECONNECT_DELAY);

  webSocket = new WebSocket(SOCKET_URL);

  webSocket.addEventListener('open', () => {
    clearTimeout(connectionTimeout);
    console.debug('Web socket connected');
  });

  webSocket.addEventListener('message', (event: MessageEvent): void => {
    console.debug('Message received');
    callback(JSON.parse(event.data));
  });

  webSocket.addEventListener('close', (event: CloseEvent): void => {
    console.debug('Web socket disconnected');
    if (webSocket.readyState < 2) webSocket.close();
    reconnectionTimeout = setTimeout(() => connect(callback), RECONNECT_DELAY);
  });
}
