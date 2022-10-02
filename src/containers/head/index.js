import MainModal from "@src/app/main-modal";
import LayoutHead from "@src/components/layouts/layout-head";
import LocaleSelect from "@src/containers/locale-select";
import useStore from "@src/hooks/use-store";
import useTranslate from "@src/hooks/use-translate";
import propTypes from "prop-types";
import React, { useCallback } from "react";

function HeadContainer(props) {
  const store = useStore();
  const { t } = useTranslate();

  const callbacks = {
    openMainInWindow: useCallback(() => {
      const stateName = `catalog-${Date.now()}`;
      store.copyState("catalog", stateName);
      store.get("multiModality").setCatalog(stateName);
      store.get("modals").open({
        render: (key) => {
          return <MainModal key={key} stateName={stateName} />;
        },
      });
    }, []),
  };

  return (
    <LayoutHead title={t(props.title)}>
      <button onClick={callbacks.openMainInWindow}>В окне</button>
      <LocaleSelect />
    </LayoutHead>
  );
}

HeadContainer.propTypes = {
  title: propTypes.string,
};

HeadContainer.defaultProps = {
  title: "title",
};

export default React.memo(HeadContainer);
