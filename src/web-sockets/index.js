export class WebSocketsService {
  constructor(services, config = {}) {
    this.services = services;
    this.config = {
      ...config,
    };
  }

  connect = (url, callbacks, options) => {
    const socket = new WebSocket(url);
    socket.onopen = callbacks.onopen;
    socket.onclose = callbacks.onclose;
    socket.onerror = callbacks.onerror;
    socket.onmessage = callbacks.onmessage;
    return socket;
  };
}
