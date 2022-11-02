import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { StoreReduxConfig } from "../config/store-redux";
import Services from "../services";
import * as reducers from "./exports";

export default function createStoreRedux(
  services: Services,
  config: StoreReduxConfig
) {
  return createStore(
    combineReducers(reducers),
    undefined,
    applyMiddleware(thunk.withExtraArgument(services))
  );
}
