/**
 * Настройки сервисов
 */

export interface Config {
  store: {
    log: boolean;
    modules: {
      session: {
        tokenHeader: string;
      };
    };
  };

  api: {
    baseUrl: string;
  };

  websockets: {
    url: string;
  };

  drawing: {
    colors: Array<string>;
  };

  storeRedux: {};
}

const config: Config = {
  store: {
    log: false,

    modules: {
      session: {
        tokenHeader: "X-Token",
      },
    },
  },

  api: {
    baseUrl: "",
  },

  websockets: {
    url: "ws://example.front.ylab.io/chat",
  },

  drawing: {
    colors: [
      "#adccc7",
      "#95b9c8",
      "#98a3c8",
      "#8d82b7",
      "#9168a6",
      "#4cbb17",
      "#124d83",
    ],
  },
  storeRedux: {},
};

export default config;
