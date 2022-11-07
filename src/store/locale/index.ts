import StateModule from "@src/store/module";
import { LocaleState } from "./types";

/**
 * Состояние товара
 */
class LocaleModule extends StateModule<LocaleState> {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState(): LocaleState {
    return {
      lang: "ru",
    };
  }

  async setLang(lang: string) {
    this.setState(
      {
        lang,
      },
      "Смена локали"
    );
  }
}

export default LocaleModule;
