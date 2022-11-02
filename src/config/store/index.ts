export interface StoreConfig {
  log: boolean;
  modules: {
    session: {
      tokenHeader: string;
    };
  };
}
