import BasketTotal from "@src/components/catalog/basket-total";
import ItemBasket from "@src/components/catalog/item-basket";
import List from "@src/components/elements/list";
import LayoutModal from "@src/components/layouts/layout-modal";
import useSelector from "@src/hooks/use-selector";
import useStore from "@src/hooks/use-store";
import useTranslate from "@src/hooks/use-translate";
import React, { useCallback } from "react";
import { useStore as useStoreRedux } from "react-redux";
import basketCatalogModal from "../basket-catalog-modal";

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
    openCatalog: useCallback(async () => {
      const catalogStateName = `catalog-${Date.now()}`;
      const result = await store.get("modals").open(
        {
          Modal: basketCatalogModal,
          props: {
            stateName: catalogStateName,
            renderItem: renders.itemMain,
          },
        },
        []
      );
      if (result) {
        store.get("basket").merge(result);
      }
    }),

    isSelected: useCallback((item, items) => {
      return !!items.find((i) => i._id === item._id);
    }, []),
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
        <button onClick={callbacks.openCatalog}>Добавить товары</button>
      }
    >
      <List items={select.items} renderItem={renders.itemBasket} />
      <BasketTotal sum={select.sum} t={t} />
    </LayoutModal>
  );
}

export default React.memo(Basket);
