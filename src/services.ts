import APIService from "./api";
import DrawingService from "./drawing";
import Store from "./store";
import createStoreRedux from "./store-redux";
import { Store as StoreRedux } from "redux";
import { WebSocketsService } from "./web-sockets";
import { Config } from "./config/config";

class Services {
  private config: Config;
  private _store: Store;
  private _api: APIService;
  private _storeRedux: StoreRedux;
  private _ws: WebSocketsService;
  private _drawing: DrawingService;

  constructor(config: any) {
    this.config = config;
  }

  get store(): Store {
    if (!this._store) {
      this._store = new Store(this, this.config.store);
    }
    return this._store;
  }

  get api(): APIService {
    if (!this._api) {
      this._api = new APIService(this, this.config.api);
    }
    return this._api;
  }

  get storeRedux(): StoreRedux {
    if (!this._storeRedux) {
      this._storeRedux = createStoreRedux(this, this.config.storeRedux);
    }
    return this._storeRedux;
  }

  get websockets(): WebSocketsService {
    if (!this._ws) {
      this._ws = new WebSocketsService(this, this.config.websockets);
    }
    return this._ws;
  }

  get drawing(): DrawingService {
    if (!this._drawing) {
      this._drawing = new DrawingService(this, this.config.drawing);
    }

    return this._drawing;
  }
}

export default Services;
