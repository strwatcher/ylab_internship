import Layout from "@src/components/layouts/layout";
import CatalogFilter from "@src/containers/catalog-filter";
import CatalogList from "@src/containers/catalog-list";
import HeadContainer from "@src/containers/head";
import ToolsContainer from "@src/containers/tools";
import TopContainer from "@src/containers/top";
import useInit from "@src/hooks/use-init";
import useSelector from "@src/hooks/use-selector";
import useStore from "@src/hooks/use-store";
import CatalogModule from "@src/store/catalog";
import CategoriesModule from "@src/store/categories";
import { State } from "@src/store/types";
import React, { useEffect } from "react";

function Main() {
  const store = useStore();

  const selector = (state: State) => ({
    params: state.catalog.params,
    catalogState: state.multiModality.catalogState,
    catalog: state.catalog.items,
  });

  const select = useSelector<typeof selector>(selector);

  useInit({
    callback: async () => {
      await store.get<CategoriesModule>("categories").load();
      await store.get<CatalogModule>("catalog").initParams();
    },
    depends: [],
    options: { backForward: true },
  });

  useEffect(() => {
    store
      .get<CatalogModule>("catalog")
      .setParams({ ...select.params }, { historyReplace: true, append: false });
  }, [select.catalogState]);

  return (
    <Layout>
      <TopContainer />
      <HeadContainer />
      <ToolsContainer />
      <CatalogFilter />
      <CatalogList />
    </Layout>
  );
}

export default React.memo(Main);
