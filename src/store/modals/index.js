import StateModule from "@src/store/module";

/**
 * Управление модальными окнами
 */
class ModalsState extends StateModule{

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
    // return new Promise((resolve, reject) => {
// 
    // })
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
