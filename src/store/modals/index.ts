import StateModule from "@src/store/module";
import { ModalItem, ModalsState } from "./types";

/**
 * Управление модальными окнами
 */
class ModalsModule extends StateModule<ModalsState> {
  initState(): ModalsState {
    return {
      items: [],
    };
  }

  /**
   * Открытие модального окна по названию
   */
  async open<TModal extends React.FC, TProps>(item: ModalItem<TModal, TProps>) {
    return new Promise((resolve) => {
      this.setState(
        {
          ...this.getState(),
          items: [...this.getState().items, { ...item, resolve }],
        },
        `Открытие модалки`
      );
    });
  }

  /**
   * Закрытие модального окна
   */
  async close<TResult>(result: TResult) {
    const modalToClose = this.getState().items.at(-1);
    if (modalToClose.resolve) {
      modalToClose.resolve(result);
    }
    this.setState(
      {
        ...this.getState(),
        items: this.getState().items.slice(0, -1),
      },
      `Закрытие модалки`
    );
  }
}

export default ModalsModule;
