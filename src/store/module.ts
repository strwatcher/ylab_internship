import Services from "@src/services";
import Store from ".";
import { SomeState } from "./types";

abstract class StateModule<TState extends SomeState> {
  store: Store;
  config: any;
  services: Services;

  constructor(store: Store, config: any) {
    this.store = store;
    this.config = config;
    this.services = store.services;
  }

  defaultConfig() {
    return {};
  }

  abstract initState(): TState;

  getState(): TState {
    return this.store.getState()[this.config.name] as TState;
  }

  setState(newState: TState, description = "setState") {
    this.store.setState(
      {
        ...this.store.getState(),
        [this.config.name]: newState,
      },
      description
    );
  }
}

export default StateModule;
