export interface SocketInstance {
  socket: WebSocket;
  resolve: Function;
  connected: boolean;
}

export interface SocketsMap {
  [key: string]: SocketInstance;
}

export interface WSCallbacks {
  onopen?: (this: WebSocket, ev: Event) => void;
  onclose?: (this: WebSocket, ev: CloseEvent) => void;
  onerror?: (this: WebSocket, ev: Event) => void;
  onmessage?: (this: WebSocket, ev: MessageEvent) => void;
}
