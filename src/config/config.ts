import { ApiConfig } from "./api";
import { DrawingConfig } from "./drawing";
import { StoreConfig } from "./store";
import { StoreReduxConfig } from "./store-redux";
import { WSConfig } from "./websockets";
export interface Config {
  store: StoreConfig;
  api: ApiConfig;
  websockets: WSConfig;
  drawing: DrawingConfig;
  storeRedux: StoreReduxConfig;
}
