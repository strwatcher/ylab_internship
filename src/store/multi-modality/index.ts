import StateModule from "@src/store/module";
import { MultiModalityState } from "./types";

/**
 * Состояние корзины
 */
class MultiModalityModule extends StateModule<MultiModalityState> {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState(): MultiModalityState {
    return {
      catalogState: "catalog",
      basketState: "basket",
    };
  }

  setCatalog(state: string) {
    this.setState({
      ...this.getState(),
      catalogState: state,
    });
  }

  setBasket(state: string) {
    this.setState({
      ...this.getState(),
      basketState: state,
    });
  }
}

export default MultiModalityModule;
