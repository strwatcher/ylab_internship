import { WSConfig } from "@src/config/websockets";
import Services from "@src/services";
import { SocketsMap, WSCallbacks } from "./types";

export class WebSocketsService {
  services: Services;
  config: WSConfig;
  sockets: SocketsMap;

  constructor(services: Services, config: WSConfig) {
    this.services = services;
    this.config = {
      ...config,
    };
    this.sockets = {};
  }

  connect = async (name: string, url: string, callbacks: WSCallbacks) => {
    return new Promise((resolve) => {
      const socket = new WebSocket(url);
      socket.onopen = callbacks.onopen;
      socket.onclose = callbacks.onclose;
      socket.onerror = callbacks.onerror;
      socket.onmessage = callbacks.onmessage;
      this.sockets[name] = { socket, resolve, connected: false };
    });
  };

  approveConnect = (name: string) => {
    if (this.sockets[name].resolve) {
      this.sockets[name].connected = true;
      this.sockets[name].resolve(name);
    }
  };

  getSocket = (name: string) => {
    return this.sockets[name].socket;
  };

  disconnect = (name: string) => {
    this.sockets[name].socket.onclose =
      null; /*() => {console.log("closed permanently")}*/
    this.sockets[name].socket.close();
  };
}
