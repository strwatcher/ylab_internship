import BasketTotal from "@src/components/catalog/basket-total";
import ItemBasket from "@src/components/catalog/item-basket";
import List from "@src/components/elements/list";
import LayoutModal from "@src/components/layouts/layout-modal";
import useSelector from "@src/hooks/use-selector";
import useStore from "@src/hooks/use-store";
import useTranslate from "@src/hooks/use-translate";
import React, { useCallback } from "react";
import { useStore as useStoreRedux } from "react-redux";
import BasketCatalogModal from "../basket-catalog-modal";

function Basket() {
  const store = useStore();
  const storeRedux = useStoreRedux();

  const select = useSelector((state) => ({
    items: state.basket.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const { t } = useTranslate();

  const callbacks = {
    // Закрытие любой модалки
    closeModal: useCallback(() => {
      store.get("modals").close();
      // storeRedux.dispatch(actionsModals.close());
    }, []),
    // Удаление из корзины
    removeFromBasket: useCallback(
      (_id) => store.get("basket").removeFromBasket(_id),
      []
    ),
    openCatalogToAdd: useCallback(() => {
      const catalogStateName = `catalog-${Date.now()}`;
      store.fork("catalog", catalogStateName);
      const basketStateName = `basket-${Date.now()}`;
      store.fork("basket", basketStateName);
      store.get("modals").open(
        {
          render: (key) => (
            <BasketCatalogModal
              key={key}
              stateName={catalogStateName}
              basketStateName={basketStateName}
              renderItem={renders.itemMain}
            />
          ),
        },
        []
      );
    }),

    isSelected: useCallback((item, items) => {
      return !!items.find(i => i._id === item._id);
    }, [])
  };

  const renders = {
    itemBasket: useCallback(
      (item) => (
        <ItemBasket
          item={item}
          link={`/articles/${item._id}`}
          onRemove={callbacks.removeFromBasket}
          onLink={callbacks.closeModal}
          labelUnit={t("basket.unit")}
          labelDelete={t("basket.delete")}
        />
      ),
      []
    ),
      };

  return (
    <LayoutModal
      title={t("basket.title")}
      labelClose={t("basket.close")}
      onClose={callbacks.closeModal}
      theme={{ scalable: true }}
      headContent={
        <button onClick={callbacks.openCatalogToAdd}>Добавить товары</button>
      }
    >
      <List items={select.items} renderItem={renders.itemBasket} />
      <BasketTotal sum={select.sum} t={t} />
    </LayoutModal>
  );
}

export default React.memo(Basket);
