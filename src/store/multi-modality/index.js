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
      catalogState: 'catalog'
    };
  }

  setCatalog(state) {
    this.setState({
      ...this.getState(),
      catalogState: state,
    });
  }



}

export default MultiModalityState;
