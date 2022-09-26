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
        { value: "order", title: "По порядку", iconString: "ПП"},
        { value: "title.ru", title: "По именованию", iconString: "ПИ"},
        { value: "-price", title: "Сначала дорогие", iconString: "СД"},
        { value: "edition", title: "Древние", iconString: "ДР"},
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
      <SearchSelect onSelect={callbacks.onSort} options={options.sort} value={select.sort}/>
      <Input
        onChange={callbacks.onSearch}
        value={select.query}
        placeholder={"Поиск"}
        theme="big"
      />
      <button onClick={callbacks.onReset}>{t("filter.reset")}</button>
      <SearchSelect
        options={[
          { value: 1, title: "Россия", iconString: "RU" },
          { value: 2, title: "Германия", iconString: "GD" },
          { value: 3, title: "Чехия", iconString: "CH" },
          { value: 4, title: "Франция", iconString: "FR" },
          { value: 5, title: "Бельгия", iconString: "BE" },
          { value: 6, title: "Англия", iconString: "EN" },
          { value: 7, title: "Белорусь", iconString: "BY" },
          { value: 8, title: "Австралия", iconString: "AU" },
          { value: 9, title: "Аргентина", iconString: "AG" },
        ]}
        value={4}
      />
    </LayoutFlex>
  );
}

export default React.memo(CatalogFilter);
