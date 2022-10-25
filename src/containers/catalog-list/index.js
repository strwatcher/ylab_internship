import AddDialog from "@src/app/add-dialog";
import Error from "@src/app/error";
import Item from "@src/components/catalog/item";
import List from "@src/components/elements/list";
import Spinner from "@src/components/elements/spinner";
import Pagination from "@src/components/navigation/pagination";
import useSelector from "@src/hooks/use-selector";
import useStore from "@src/hooks/use-store";
import useTranslate from "@src/hooks/use-translate";
import propTypes from "prop-types";
import React, { useCallback } from "react";

CatalogList.propTypes = {
  stateName: propTypes.string,
};

CatalogList.defaultProps = {
  stateName: "catalog",
  basketStateName: "basket",
};

function CatalogList({ stateName, renderItem }) {
  const store = useStore();

  const select = useSelector((state) => ({
    items: state[stateName].items,
    page: state[stateName].params.page,
    limit: state[stateName].params.limit,
    count: state[stateName].count,
    waiting: state[stateName].waiting,
    hasMore: state[stateName].hasMore,
  }));

  const { t } = useTranslate();
  const callbacks = {
    closeModal: useCallback(() => store.get("modals").close()),

    onAddFail: useCallback(() => {
      store
        .get("modals")
        .open({ Modal: Error, props: { errorText: "Неверный формат поля" } });
      store.get("addDialog").setAmount(1);
    }, []),
    
    // Добавление в корзину
    addToBasket: useCallback(async (_id) => {
      const result = await store.get("modals").open({
        Modal: AddDialog,
        props: {
          onError: callbacks.onAddFail,
        },
      });
      result >= 1 && store.get("basket").addToBasket(_id, result);
    }, []),
    // Пагианция
    onPaginate: useCallback(
      (page) => store.get(stateName).setParams({ page }),

      []
    ),
    increasePage: useCallback(
      () =>
        store
          .get(stateName)

          .setParams(
            { page: select.page + 1 },
            { historyReplace: true, append: true }
          ),
      [select.page]
    ),
  };

  // const observedRef = useInfinityScroll(
  // select.waiting,
  // select.hasMore,
  // callbacks.increasePage
  // );

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
  };


  return (
    <Spinner active={select.waiting}>
      <List items={select.items} renderItem={renderItem || renders.item} />
      {/* {!isFirstRender && ( */}
      {/* // <div ref={observedRef} style={{ height: "50px" }}></div> */}
      {/* )} */}
      <Pagination
        count={select.count}
        page={select.page}
        limit={select.limit}
        onChange={callbacks.onPaginate}
      />
    </Spinner>
  );
}

export default React.memo(CatalogList);
