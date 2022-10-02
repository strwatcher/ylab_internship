import Layout from "@src/components/layouts/layout";
import CatalogFilter from "@src/containers/catalog-filter";
import CatalogList from "@src/containers/catalog-list";
import HeadContainer from "@src/containers/head";
import ToolsContainer from "@src/containers/tools";
import TopContainer from "@src/containers/top";
import useInit from "@src/hooks/use-init";
import useSelector from "@src/hooks/use-selector";
import useStore from "@src/hooks/use-store";
import React, { useEffect } from "react";

function Main() {
  const store = useStore();

  const select = useSelector(state => ({
    params: state.catalog.params,
    catalogState: state.multiModality.catalogState
  }));

  useInit(async () => {
    await Promise.all([
      store.get('catalog').initParams(),
      store.get('categories').load()
    ]);
  }, [], {backForward: true});

  useEffect(() => {
    store.get('catalog').setParams({...select.params}, {historyReplace: true, append: false})
  }, [select.catalogState]);

  return (
    <Layout>
      <TopContainer/>
      <HeadContainer/>
      <ToolsContainer/>
      <CatalogFilter/>
      <CatalogList/>
    </Layout>
  )
}

export default React.memo(Main);
