import BasketCatalogAdd from "@src/components/catalog/basket-catalog-add";
import SelectableItem from "@src/components/catalog/selectable-item";
import LayoutModal from "@src/components/layouts/layout-modal";
import CatalogFilter from "@src/containers/catalog-filter";
import CatalogList from "@src/containers/catalog-list";
import useInit from "@src/hooks/use-init";
import useSelector from "@src/hooks/use-selector";
import useStore from "@src/hooks/use-store";
import React, { useCallback } from "react";

function BasketMainModal({ stateName }) {
  const store = useStore();

  const select = useSelector((state) => ({
    catalog: state[stateName],
    basketItems: state.multiselectBasket.items,
  }));

  useInit({
    callback: async () => {
      store.createState("catalog", stateName);
      store.get("multiModality").setCatalog(stateName);
      await store.get(stateName).initParams();
    },
    depends: [],
  });

  const callbacks = {
    close: useCallback(async (result) => {
      await store.get("modals").close(result);
      store.get("multiModality").setCatalog("catalog");
      store.get("multiselectBasket").clear();
    }, []),

    success: useCallback(() => {
      callbacks.close([...select.basketItems]);
    }, [select.basketItems]),

    addToBasket: useCallback((id) => {
      store.get("multiselectBasket").addToBasket(id);
    }, []),

    setAmount: useCallback((id, amount) => {
      store.get("multiselectBasket").setAmount(id, amount);
    }, []),

    itemBasketInfo: useCallback(
      (id) => {
        const item = select.basketItems.find((i) => id === i._id);
        if (item) {
          return { selected: true, amount: item.amount };
        }
        return { selected: false };
      },
      [select.basketItems]
    ),
  };

  const renders = {
    item: useCallback(
      (item) => {
        const itemInfo = callbacks.itemBasketInfo(item._id);
        return (
          <SelectableItem
            item={item}
            link={`/articles/${item._id}`}
            onSelect={callbacks.addToBasket}
            onChangeAmount={callbacks.setAmount}
            selected={itemInfo.selected}
            amount={itemInfo.amount}
          />
        );
      },
      [select.basketItems]
    ),
  };

  return (
    select.catalog && (
      <LayoutModal
        theme={{ scalable: true }}
        onClose={() => callbacks.close(null)}
      >
        <CatalogFilter stateName={stateName} />
        <CatalogList stateName={stateName} renderItem={renders.item} />
        <BasketCatalogAdd onClick={callbacks.success} />
      </LayoutModal>
    )
  );
}

export default React.memo(BasketMainModal);
