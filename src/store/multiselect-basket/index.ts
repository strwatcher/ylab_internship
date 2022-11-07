import StateModule from "@src/store/module";
import { BasketItem } from "../basket/types";
import { MultiselectBasketState } from "./types";

/**
 * Состояние корзины
 */
class MultiselectBasketModule extends StateModule<MultiselectBasketState> {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState(): MultiselectBasketState {
    return {
      items: [],
    };
  }

  /**
   * Добавление товара в корзину
   * @param _id Код товара
   */
  async addToBasket(_id: string) {
    // Ищем товар в корзие, чтобы увеличить его количество. Заодно получаем новый массив items
    let exists = false;
    const items: BasketItem[] = this.getState().items.map(
      (item: BasketItem) => {
        let result = item;
        // Искомый товар для увеличения его количества
        if (item._id === _id) {
          exists = true;
          result = { ...item, amount: item.amount + 1 };
        }
        // Добавляея в общую сумму
        return result;
      }
    );

    // Если товар не был найден в корзине, то добавляем его из каталога
    if (!exists) {
      // Поиск товара в каталоге, чтобы его в корзину добавить
      const json = await this.services.api.request({
        url: `/api/v1/articles/${_id}`,
      });

      const item = json.result;
      items.push({ ...item, amount: 1 });
    }

    // Установка состояние, basket тоже нужно сделать новым
    this.setState(
      {
        items,
      },
      "Добавление в корзину"
    );
  }

  setAmount(_id: string, amount: number) {
    const item = this.getState().items.findIndex(
      (item: BasketItem) => item._id === _id
    );
    let items = [...this.getState().items];
    if (amount <= 0) {
      items = items.filter((i) => i._id !== _id);
    } else {
      items[item] = { ...items[item], amount };
    }
    this.setState({
      ...this.getState(),
      items: items,
    });
  }

  clear() {
    this.setState({
      items: [],
    });
  }
}

export default MultiselectBasketModule;
