import StateModule from "@src/store/module";

/**
 * Управление модальными окнами
 */
class ModalsState extends StateModule {
  initState() {
    return {
      items: [],
    };
  }

  /**
   * Открытие модального окна по названию
   */
  async open(item) {
    return new Promise((resolve) => {
      this.setState(
        {
          ...this.getState(),
          items: [...this.getState().items, { ...item, resolve, result: null }],
        },
        `Открытие модалки`
      );
    });
  }

  /**
   * Закрытие модального окна
   */
  async close(result) {
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

export default ModalsState;
