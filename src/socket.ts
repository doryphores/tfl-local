const SOCKET_URL = `ws://${window.location.hostname}:${process.env['REACT_APP_SERVER_PORT']}`;
const RECONNECT_DELAY = 5000;

let webSocket: WebSocket;
let timer: NodeJS.Timeout;

export function connect(callback: (msg: any) => void): void {
  if (timer) clearTimeout(timer);
  console.debug('Connecting to web socket');

  webSocket = new WebSocket(SOCKET_URL);

  webSocket.addEventListener('open', () => {
    console.debug('Web socket connected');
  });

  webSocket.addEventListener('message', (event: MessageEvent): void => {
    console.debug('Message received');
    callback(JSON.parse(event.data));
  });

  webSocket.addEventListener('close', (event: CloseEvent): void => {
    console.debug('Web socket disconnected');
    if (webSocket.readyState < 2) webSocket.close();
    timer = setTimeout(() => connect(callback), RECONNECT_DELAY);
  });
}
