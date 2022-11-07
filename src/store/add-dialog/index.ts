import StateModule from "@src/store/module";
import { AddDialogState } from "./types";

/**
 * Состояние корзины
 */
class AddDialogModule extends StateModule<AddDialogState> {
  /**
   * Начальное состояние
   */
  initState() {
    return {
      amount: 1,
    };
  }

  setAmount(newAmount: number) {
    this.setState({
      ...this.getState(),
      amount: newAmount,
    });
  }
}

export default AddDialogModule;
