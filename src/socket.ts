const SOCKET_URL = 'ws://localhost:8080';
const RECONNECT_DELAY = 5000;

let webSocket: WebSocket;
let timer: NodeJS.Timeout;

export function connect(callback: (msg: any) => void): void {
  if (timer) clearTimeout(timer);
  console.debug('Connecting');

  if (!SOCKET_URL) throw new Error('SOCKET_URL is undefined');

  webSocket = new WebSocket(SOCKET_URL);

  webSocket.addEventListener('open', () => {
    console.debug('Connected');
  });

  webSocket.addEventListener('message', (event: MessageEvent): void => {
    const data = JSON.parse(event.data);
    callback(data);
  });

  webSocket.addEventListener('close', (event: CloseEvent): void => {
    console.debug('Disconnected');
    if (webSocket.readyState < 2) webSocket.close();
    timer = setTimeout(() => connect(callback), RECONNECT_DELAY);
  });
}
