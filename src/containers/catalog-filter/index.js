import Input from "@src/components/elements/input";
import SearchSelect from "@src/components/elements/search-select";
import Select from "@src/components/elements/select";
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
        { value: "order", title: "По порядку" },
        { value: "title.ru", title: "По именованию" },
        { value: "-price", title: "Сначала дорогие" },
        { value: "edition", title: "Древние" },
      ],
      []
    ),

    categories: useMemo(
      () => [
        { value: "", title: "Все" },
        ...treeToList(listToTree(select.categories), (item, level) => ({
          value: item._id,
          title: "- ".repeat(level) + item.title,
        })),
      ],
      [select.categories]
    ),
  };

  return (
    <LayoutFlex flex="start" indent="big">
      <Select
        onChange={callbacks.onCategory}
        value={select.category}
        options={options.categories}
      />
      <Select
        onChange={callbacks.onSort}
        value={select.sort}
        options={options.sort}
      />
      <Input
        onChange={callbacks.onSearch}
        value={select.query}
        placeholder={"Поиск"}
        theme="big"
      />
      <button onClick={callbacks.onReset}>{t("filter.reset")}</button>
      <SearchSelect
        options={[
          { _id: 1, title: "Россия", iconString: "RU" },
          { _id: 2, title: "Германия", iconString: "GD" },
          { _id: 3, title: "Чехия", iconString: "CH" },
          { _id: 4, title: "Франция", iconString: "FR" },
          { _id: 5, title: "Бельгия", iconString: "BE" },
        ]}
      />
    </LayoutFlex>
  );
}

export default React.memo(CatalogFilter);
