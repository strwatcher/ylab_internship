import StateModule from "@src/store/module";

/**
 * Управление модальными окнами
 */
class ModalsState extends StateModule{

  // items: [{render: () => jsx, onClose: result => void, onSuccess: result => void}]
  initState() {
    return {
      items: []
    };
  }

  /**
   * Открытие модального окна по названию
   */
  open(item){
    this.setState({
      ...this.getState(),
      items: [...this.getState().items, item],
    }, `Открытие модалки`);
  }

  /**
   * Закрытие модального окна
   */
  close(){
    this.setState({
      ...this.getState(),
      items: this.getState().items.slice(0, -1),
    }, `Закрытие модалки`);
  }
}

export default ModalsState;
