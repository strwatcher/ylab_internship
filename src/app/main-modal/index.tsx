import LayoutModal from "@src/components/layouts/layout-modal";
import CatalogFilter from "@src/containers/catalog-filter";
import CatalogList from "@src/containers/catalog-list";
import useInit from "@src/hooks/use-init";
import useSelector from "@src/hooks/use-selector";
import useStore from "@src/hooks/use-store";
import CatalogModule from "@src/store/catalog";
import StateModule from "@src/store/module";
import React from "react";

interface MainModalProps {
  stateName: string;
  renderItem: (item: any) => React.ReactNode;
}

const MainModal: React.FC<MainModalProps> = ({ stateName, renderItem }) => {
  const store = useStore();

  const select = useSelector((state) => ({
    catalog: state[stateName],
  }));

  useInit({
    callback: async () => {
      store.createState("catalog", stateName);
      store.get("multiModality").setCatalog(stateName);
      await (store.modules[stateName] as CatalogModule).initParams();
    },
    depends: [],
  });

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
};

export default React.memo(MainModal);
