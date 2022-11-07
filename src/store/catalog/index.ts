import StateModule from "@src/store/module";
import diff from "@src/utils/diff";
import qs from "@src/utils/search-params";
import { CatalogParams, CatalogState, QSParams } from "./types";

/**
 * Состояние каталога
 */
class CatalogModule extends StateModule<CatalogState> {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState(): CatalogState {
    return {
      items: [],
      count: 0,
      params: {
        page: 1,
        limit: 10,
        sort: "order",
        query: "",
        category: "",
      },
      hasMore: true,
      waiting: false,
    };
  }

  /**
   * Инициализация параметров.
   * Восстановление из query string адреса
   */

  async initParams(params: CatalogParams = {}) {
    // Параметры из URl. Их нужно валидирвать, приводить типы и брать толкьо нужные
    const urlParams = qs.parse<QSParams>(window.location.search);
    let validParams: CatalogParams = {};
    const ns = this.config.name;
    if (urlParams[ns]?.page)
      validParams.page = Number(urlParams[ns]?.page) || 1;
    if (urlParams[ns]?.limit)
      validParams.limit = Number(urlParams[ns]?.limit) || 10;
    if (urlParams[ns]?.sort) validParams.sort = urlParams[ns]?.sort;
    if (urlParams[ns]?.query) validParams.query = urlParams[ns]?.query;
    if (urlParams[ns]?.category) validParams.category = urlParams[ns]?.category;

    // Итоговые параметры из начальных, из URL и из переданных явно
    const newParams = { ...this.initState().params, ...validParams, ...params };
    // Установка параметров и подгрузка данных
    await this.setParams(newParams, { historyReplace: true, append: false });
  }

  /**
   * Сброс параметров к начальным
   */
  async resetParams(params: CatalogParams = {}) {
    // Итоговые параметры из начальных, из URL и из переданных явно
    const newParams = { ...this.initState().params, ...params };
    // Установк параметров и подгрузка данных
    await this.setParams(newParams);
  }

  /**
   * Устанвока параметров и загрузка списка товаров
   */
  async setParams(
    params: CatalogParams = {},
    options = { historyReplace: false, append: false }
  ): Promise<void> {
    const newParams: CatalogParams = { ...this.getState().params, ...params };
    const ns = this.config.name;
    // Установка новых параметров и признака загрузки
    this.setState(
      {
        ...this.getState(),
        params: newParams,
        waiting: true,
      },
      "Смена параметров каталога"
    );

    const apiParams = diff(
      {
        limit: newParams.limit,
        skip: (newParams.page - 1) * newParams.limit,
        fields: "items(*),count",
        sort: newParams.sort,
        search: {
          query: newParams.query, // search[query]=text
          category: newParams.category, // -> search[category]=id
        },
      },
      { skip: 0, search: { query: "", category: "" } }
    );

    // ?search[query]=text&search[category]=id
    const json = await this.services.api.request({
      url: `/api/v1/articles${qs.stringify(apiParams)}`,
    });

    // Установка полученных данных и сброс признака загрузки
    this.setState(
      {
        ...this.getState(),
        items: options.append
          ? [...this.getState().items, ...json.result.items]
          : json.result.items,
        count: json.result.count,
        hasMore:
          Math.ceil(json.result.count / this.getState().params.limit) >
          this.getState().params.page,
        waiting: false,
      },
      "Обновление списка товара"
    );

    // Запоминаем параметры в URL, которые отличаются от начальных
    let queryString = qs.stringify<QSParams>(
      diff({ [ns]: newParams }, { [ns]: this.initState().params })
    );
    const url = window.location.pathname + queryString + window.location.hash;
    if (options.historyReplace) {
      window.history.replaceState({}, "", url);
    } else {
      window.history.pushState({}, "", url);
    }
  }
}

export default CatalogModule;
