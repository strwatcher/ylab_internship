import { StoreConfig } from "@src/config/store/index.js";
import Services from "@src/services.js";
import {
  IModules,
  IStoreModules,
  modules,
  State,
  StaticStoreModules,
} from "./types";

class Store {
  services: Services;
  config: StoreConfig;
  private state: State;
  readonly modules: IStoreModules;
  listeners: Function[];
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
    // Слушатели изменений state
    this.listeners = [];

    // Модули
    const tmpModules: any = {};
    const tmpState: any = {};

    for (const name of Object.keys(modules)) {
      const castedName = name as keyof IModules;
      // Экземпляр модуля. Передаём ему ссылку на store и навзание модуля.
      tmpModules[name] = new modules[castedName](this, {
        name,
        ...(this.config.modules[name as keyof StoreConfig["modules"]] ?? {}),
      });
      // По названию модyля устанавливается свойство с начальным состоянием от модуля
      tmpState[name] = tmpModules[castedName].initState();
    }
    this.modules = tmpModules;
    this.state = tmpState;
  }

  createState(ref: keyof IModules, name: string) {
    this.modules[name] = new modules[ref](this, {
      name,
      ...(this.config.modules[ref as keyof StoreConfig["modules"]] ?? {}),
    });
    this.state[name] = this.modules[name].initState();
  }

  /**
   * Доступ к модулю состояния
   */
  get<T extends keyof StaticStoreModules>(name: T): StaticStoreModules[T] {
    return this.modules[name];
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
