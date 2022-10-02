import LayoutModal from "@src/components/layouts/layout-modal";
import CatalogFilter from "@src/containers/catalog-filter";
import CatalogList from "@src/containers/catalog-list";
import useInit from "@src/hooks/use-init";
import useStore from "@src/hooks/use-store";
import React from "react";

function MainModal({stateName}) {
  const store = useStore();

  useInit(async () => {
    await Promise.all([
      store.get(stateName).initParams(),
      store.get('categories').load()
    ]);
  }, [], {backForward: true});

  const callbacks = {
    close: () => {
      store.get("modals").close();
      store.get("multiModality").setCatalog("catalog");
    }
  }

  return (
    <LayoutModal theme={{scalable: true}} onClose={callbacks.close}>
      <CatalogFilter stateName={stateName}/>
      <CatalogList stateName={stateName}/>
    </LayoutModal>
  )
}

export default React.memo(MainModal);
