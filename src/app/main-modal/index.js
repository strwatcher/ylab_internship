import LayoutModal from "@src/components/layouts/layout-modal";
import CatalogFilter from "@src/containers/catalog-filter";
import CatalogList from "@src/containers/catalog-list";
import useInit from "@src/hooks/use-init";
import useSelector from "@src/hooks/use-selector";
import useStore from "@src/hooks/use-store";
import React from "react";

function MainModal({ stateName, renderItem }) {
  const store = useStore();

  const select = useSelector((state) => ({
    catalog: state[stateName],
  }));

  useInit(async () => {
    store.fork("catalog", stateName);
    await store.get(stateName).initParams();
  }, []);

  const callbacks = {
    close: () => {
      store.get("modals").close();
      store.get("multiModality").setCatalog("catalog");
    },
  };

  return (
    <>
      {select.catalog && (
        <LayoutModal theme={{ scalable: true }} onClose={callbacks.close}>
          <CatalogFilter stateName={stateName} />
          <CatalogList stateName={stateName} renderItem={renderItem} />
        </LayoutModal>
      )}
    </>
  );
}

export default React.memo(MainModal);
