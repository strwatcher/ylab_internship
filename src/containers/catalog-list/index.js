import AddDialog from "@src/app/add-dialog";
import Error from "@src/app/error";
import Item from "@src/components/catalog/item";
import List from "@src/components/elements/list";
import Spinner from "@src/components/elements/spinner";
import Pagination from "@src/components/navigation/pagination";
import { useFirstRender } from "@src/hooks/use-first-render";
import { useInfinityScroll } from "@src/hooks/use-infinity-scroll";
import useSelector from "@src/hooks/use-selector";
import useStore from "@src/hooks/use-store";
import useTranslate from "@src/hooks/use-translate";
import React, { useCallback } from "react";

function CatalogList() {
  const store = useStore();

  const select = useSelector((state) => ({
    items: state.catalog.items,
    page: state.catalog.params.page,
    limit: state.catalog.params.limit,
    count: state.catalog.count,
    waiting: state.catalog.waiting,
    hasMore: state.catalog.hasMore,
  }));

  const { t } = useTranslate();

  const callbacks = {
    closeModal: useCallback(() => store.get("modals").close()),

    onAddSuccess: useCallback((_id) => (amount) => {
      store.get("basket").addToBasket(_id, amount);
    }),

    onAddFail: useCallback(() => {
      store.get("modals").open({ render: renders.error });
      store.get("addDialog").setAmount(1);
    }, []),
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) =>
        store.get("modals").open({ render: renders.dialog(_id) }),
      []
    ),
    // Пагианция
    onPaginate: useCallback(
      (page) => store.get("catalog").setParams({ page }),
      []
    ),
    increasePage: useCallback(
      () =>
        store
          .get("catalog")
          .setParams(
            { page: select.page + 1 },
            { historyReplace: true, append: true }
          ),
      [select.page]
    ),
  };

  const observedRef = useInfinityScroll(
    select.waiting,
    select.hasMore,
    callbacks.increasePage
  );

  const renders = {
    item: useCallback(
      (item) => (
        <Item
          item={item}
          onAdd={callbacks.addToBasket}
          link={`/articles/${item._id}`}
          labelAdd={t("article.add")}
        />
      ),
      [t]
    ),

    dialog: useCallback(
      (_id) => (key) => (
        <AddDialog
          key={key}
          onSuccess={callbacks.onAddSuccess(_id)}
          onError={callbacks.onAddFail}
        />
      ),
      []
    ),

    error: useCallback((key) => (
      <Error
      key={key}
        onClose={callbacks.closeModal}
        errorText={"Неверный формат поля"}
      />
    ), []),
  };

  const isFirstRender = useFirstRender();

  return (
    <Spinner active={select.waiting}>
      <Pagination
        count={select.count}
        page={select.page}
        limit={select.limit}
        onChange={callbacks.onPaginate}
      />
      <List items={select.items} renderItem={renders.item} />
      {!isFirstRender && (
        <div ref={observedRef} style={{ height: "50px" }}></div>
      )}
    </Spinner>
  );
}

export default React.memo(CatalogList);
