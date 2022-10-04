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
    basket: state[basketStateName],
    catalog: state[stateName],
    // basketItems: state[basketStateName].items,
  }));

  useInit(
    async () => {
      store.createState("catalog", stateName);
      store.createState("basket", basketStateName);
      await Promise.all([
        store.get(stateName).initParams(),
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
        return !!select.basket.items.find((i) => i._id === item._id);
      },
      [select.basket]
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
      [callbacks.isSelected]
    ),
  };

  return (select.basket && select.catalog && (
    <LayoutModal theme={{ scalable: true }} onClose={callbacks.close}>
      <CatalogFilter stateName={stateName} />
      <CatalogList stateName={stateName} renderItem={renders.item} />
    </LayoutModal>
  ))
}

export default React.memo(BasketMainModal);
