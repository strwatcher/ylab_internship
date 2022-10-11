export class WebSocketsService {
  constructor(services, config = {}) {
    this.services = services;
    this.config = {
      ...config,
    };
    this.sockets = {};
  }

  connect = async (name, url, callbacks) => {
    return new Promise((resolve) => {
      const socket = new WebSocket(url);
      socket.onopen = callbacks.onopen;
      socket.onclose = callbacks.onclose;
      socket.onerror = callbacks.onerror;
      socket.onmessage = callbacks.onmessage;
      this.sockets[name] = { socket, resolve };
    });
  };

  approveConnect = async (name) => {
    if (this.sockets[name].resolve) {
      this.sockets[name].connected = true;
      this.sockets[name].resolve(name);
    }
  };

  getSocket = (name) => {
    return this.sockets[name].socket;
  };

  disconnect = (name) => {
    this.sockets[name].socket.onclose = null;/*() => {console.log("closed permanently")}*/ 
    this.sockets[name].socket.close();
  }
}
