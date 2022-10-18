import APIService from "./api";
import DrawingService from "./drawing";
import Store from "./store";
import createStoreRedux from "./store-redux";
import { WebSocketsService } from "./web-sockets";

class Services {

  constructor(config) {
    this.config = config;
  }

  /**
   * Сервис Store
   * @returns {Store}
   */
  get store(){
    if (!this._store) {
      this._store = new Store(this, this.config.store);
    }
    return this._store;
  }

  /**
   * Сервис АПИ
   * @returns {APIService}
   */
  get api(){
    if (!this._api) {
      this._api = new APIService(this, this.config.api);
    }
    return this._api;
  }

  /**
   * Redux store
   */
  get storeRedux(){
    if (!this._storeRedux) {
      this._storeRedux = createStoreRedux(this, this.config.storeRedux);
    }
    return this._storeRedux;
  }

  get websockets() {
    if (!this._websockets) {
      this._websockets = new WebSocketsService(this, this.config.websockets);
    }
    return this._websockets;
  }

  get drawing() {
    if(!this._drawing) {
      this._drawing = new DrawingService(this, this.config.drawing);
    }

    return this._drawing
  }
}

export default Services;
