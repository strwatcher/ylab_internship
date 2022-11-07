import { StoreConfig } from "@src/config/store/index.js";
import Services from "@src/services.js";
import StateModule from "./module";
import { State, modules, Modules, SomeState } from "./types";

class Store {
  services: Services;
  config: StoreConfig;
  state: State;
  listeners: Function[];
  modules: Modules;
  /**
   * @param services {Services}
   * @param config {Object}
   */
  constructor(services: Services, config: StoreConfig) {
    // Менеджер сервисов
    this.services = services;
    this.config = {
      log: false,
      ...config,
    };
    // Состояние приложения (данные)
    this.state = {};
    // Слушатели изменений state
    this.listeners = [];

    // Модули
    this.modules = {};
    for (const name of Object.keys(modules)) {
      const castedName = name as keyof typeof modules;
      // Экземпляр модуля. Передаём ему ссылку на store и навзание модуля.
      this.modules[name as keyof typeof modules] = new modules[castedName](
        this,
        {
          name,
          ...(this.config.modules[name as keyof StoreConfig["modules"]] ?? {}),
        }
      );
      // По названию модля устанавливается свойство с начальным состоянием от модуля
      this.state[name] = this.modules[castedName].initState();
    }
  }

  createState(ref: keyof typeof modules, name: string) {
    this.modules[name] = new modules[ref](this, {
      name,
      ...(this.config.modules[ref as keyof StoreConfig["modules"]] ?? {}),
    });
    this.state[name] = this.modules[name as keyof typeof modules].initState();
  }

  /**
   * Доступ к модулю состояния
   */
  get<TModule extends StateModule<SomeState>>(
    name: keyof typeof modules
  ): TModule {
    return this.modules[name] as TModule;
  }

  /**
   * Выбор state
   */
  getState(): State {
    return this.state;
  }

  /**
   * Установка state
   */
  setState(newState: State, description = "setState") {
    if (this.config.log) {
      console.group(
        `%c${"store.setState"} %c${description}`,
        `color: ${"#777"}; font-weight: normal`,
        `color: ${"#333"}; font-weight: bold`
      );
      console.log(`%c${"prev:"}`, `color: ${"#d77332"}`, this.state);
      console.log(`%c${"next:"}`, `color: ${"#2fa827"}`, newState);
      console.groupEnd();
    }
    this.state = newState;
    // Оповещаем всех подписчиков об изменении стейта
    for (const listener of this.listeners) {
      listener();
    }
  }

  /**
   * Подписка на изменение state
   */
  subscribe(callback: Function): Function {
    this.listeners.push(callback);
    // Возвращаем функцию для удаления слушателя
    return () => {
      this.listeners = this.listeners.filter((item) => item !== callback);
    };
  }
}

export default Store;
