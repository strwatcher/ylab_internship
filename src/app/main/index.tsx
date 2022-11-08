import Layout from "@src/components/layouts/layout";
import CatalogFilter from "@src/containers/catalog-filter";
import CatalogList from "@src/containers/catalog-list";
import HeadContainer from "@src/containers/head";
import ToolsContainer from "@src/containers/tools";
import TopContainer from "@src/containers/top";
import useInit from "@src/hooks/use-init";
import useSelector from "@src/hooks/use-selector";
import useStore from "@src/hooks/use-store";
import { State } from "@src/store/types";
import React, { useEffect } from "react";

function Main() {
  const store = useStore();

  const select = useSelector((state: State) => ({
    params: state.catalog.params,
    catalogState: state.multiModality.catalogState,
    catalog: state.catalog.items,
  }));

  useInit({
    callback: async () => {
      await store.get("categories").load();
      await store.get("catalog").initParams();
    },

    depends: [],
    options: { backForward: true },
  });

  useEffect(() => {
    store
      .get("catalog")
      .setParams({ ...select.params }, { historyReplace: true, append: false });
  }, [select.catalogState]);

  return (
    <Layout>
      <TopContainer />
      <HeadContainer title={"Каталог"} />
      <ToolsContainer />
      <CatalogFilter />
      <CatalogList />
    </Layout>
  );
}

export default React.memo(Main);
