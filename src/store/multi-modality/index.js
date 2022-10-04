import StateModule from "@src/store/module";

/**
 * Состояние корзины
 */
class MultiModalityState extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      catalogState: 'catalog',
      basketState: 'basket'
    };
  }

  setCatalog(state) {
    this.setState({
      ...this.getState(),
      catalogState: state,
    });
  }

  setBasket(state) {
    this.setState({
      ...this.getState(),
      basketState: state
    });
  }



}

export default MultiModalityState;
