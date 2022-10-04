import SelectableItem from "@src/components/catalog/selectable-item";
import LayoutModal from "@src/components/layouts/layout-modal";
import CatalogFilter from "@src/containers/catalog-filter";
import CatalogList from "@src/containers/catalog-list";
import useInit from "@src/hooks/use-init";
import useSelector from "@src/hooks/use-selector";
import useStore from "@src/hooks/use-store";
import React, { useCallback } from "react";

function BasketMainModal({ stateName, basketStateName }) {
  const store = useStore();

  const select = useSelector((state) => ({
    basketItems: state[basketStateName].items,
  }));

  useInit(
    async () => {
      await Promise.all([
        store.get(stateName).initParams(),
        store.get("categories").load(),
      ]);
    },
    [],
    { backForward: true }
  );

  const callbacks = {
    close: () => {
      store.get("modals").close();
      store.get("multiModality").setCatalog("catalog");
    },
    isSelected: useCallback(
      (item) => {
        return !!select.basketItems.find((i) => i._id === item._id);
      },
      [select.basketItems]
    ),
  };

  const renders = {
    item: useCallback(
      (item) =>
        (
          <SelectableItem
            item={item}
            link={`/articles/${item._id}`}
            selected={callbacks.isSelected(item)}
            // onSelect={onSelect}
          />
        ),
      []
    ),
  };

  return (
    <LayoutModal theme={{ scalable: true }} onClose={callbacks.close}>
      <CatalogFilter stateName={stateName} />
      <CatalogList stateName={stateName} renderItem={renders.item} />
    </LayoutModal>
  );
}

export default React.memo(BasketMainModal);
