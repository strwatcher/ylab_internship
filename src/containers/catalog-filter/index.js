import Input from "@src/components/elements/input";
import SearchSelect from "@src/components/elements/search-select";
import LayoutFlex from "@src/components/layouts/layout-flex";
import useSelector from "@src/hooks/use-selector";
import useStore from "@src/hooks/use-store";
import useTranslate from "@src/hooks/use-translate";
import listToTree from "@src/utils/list-to-tree";
import treeToList from "@src/utils/tree-to-list";
import React, { useCallback, useMemo } from "react";

function CatalogFilter() {
  const store = useStore();

  const select = useSelector((state) => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.catalog.params.category,
    categories: state.categories.items,
  }));

  const { t } = useTranslate();

  const callbacks = {
    // Сортировка
    onSort: useCallback((sort) => store.get("catalog").setParams({ sort }), []),
    // Поиск
    onSearch: useCallback(
      (query) => store.get("catalog").setParams({ query, page: 1 }),
      []
    ),
    // Сброс
    onReset: useCallback(() => store.get("catalog").resetParams(), []),
    // Фильтр по категории
    onCategory: useCallback(
      (category) => store.get("catalog").setParams({ category }),
      []
    ),
  };

  // Опции для полей
  const options = {
    sort: useMemo(
      () => [
        { value: "order", title: "По порядку", iconString: "ПП"},
        { value: "title.ru", title: "По именованию", iconString: "ПИ"},
        { value: "-price", title: "Сначала дорогие", iconString: "СД"},
        { value: "edition", title: "Древние", iconString: "ДР"},
      ],
      []
    ),

    categories: useMemo(
      () => [
        { value: "", title: "Все", iconString: "" },
        ...treeToList(listToTree(select.categories), (item, level) => ({
          value: item._id,
          title: "- ".repeat(level) + item.title,
          iconString: ""
        })),
      ],
      [select.categories]
    ),
  };

  return (
    <LayoutFlex flex="start" indent="big">
      <SearchSelect
        onChange={callbacks.onCategory}
        value={select.category}
        options={options.categories}
        // width={100}
      />
      <SearchSelect onChange={callbacks.onSort} options={options.sort} value={select.sort}/>
      <Input
        onChange={callbacks.onSearch}
        value={select.query}
        placeholder={"Поиск"}
        theme="big"
      />
      <button onClick={callbacks.onReset}>{t("filter.reset")}</button>
    </LayoutFlex>
  );
}

export default React.memo(CatalogFilter);
