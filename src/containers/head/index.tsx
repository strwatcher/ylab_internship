import MainModal from "@src/app/main-modal";
import LayoutHead from "@src/components/layouts/layout-head";
import LocaleSelect from "@src/containers/locale-select";
import useStore from "@src/hooks/use-store";
import useTranslate from "@src/hooks/use-translate";
import propTypes from "prop-types";
import React, { useCallback } from "react";

interface HeadContainerProps {
  title: string;
}

const HeadContainer: React.FC<HeadContainerProps> = (props) => {
  const store = useStore();
  const { t } = useTranslate();

  const callbacks = {
    openMainInWindow: useCallback(() => {
      const stateName = `catalog-${Date.now()}`;
      store.get("multiModality").setCatalog(stateName);
      store.get("modals").open({
        Modal: MainModal,
        props: {
          stateName,
        },
      });
    }, []),
  };

  return (
    <LayoutHead title={t(props.title)} fixed={false}>
      <button onClick={callbacks.openMainInWindow}>В окне</button>
      <LocaleSelect />
    </LayoutHead>
  );
};

HeadContainer.propTypes = {
  title: propTypes.string,
};

HeadContainer.defaultProps = {
  title: "title",
};

export default React.memo(HeadContainer);
