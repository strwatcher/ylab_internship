import StateModule from "@src/store/module";
import qs from "@src/utils/search-params";
import { CategoriesState } from "./types";

/**
 * Состояние товара
 */
class CategoriesModule extends StateModule<CategoriesState> {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState(): CategoriesState {
    return {
      items: [],
      waiting: false,
    };
  }

  /**
   * Загрузка списка товаров
   */
  async load() {
    this.setState({ waiting: true, items: [] }, "Ожидание загрузки категорий");

    const params = { fields: "_id,title,parent(_id)", limit: "*" };
    const json = await this.services.api.request({
      url: `/api/v1/categories/${qs.stringify(params)}`,
    });

    // Товар загружен успешно
    this.setState(
      {
        items: json.result.items,
        waiting: false,
      },
      "Катеории загружены"
    );
  }
}

export default CategoriesModule;
