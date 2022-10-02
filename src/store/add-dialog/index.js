import StateModule from "@src/store/module";

/**
 * Состояние корзины
 */
class AddDialogState extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      amount: 1,
    };
  }

  setAmount(newAmount) {
    this.setState({
      ...this.getState(),
      amount: newAmount,
    });
  }



}

export default AddDialogState;
