import LayoutHead from "@src/components/layouts/layout-head";
import LocaleSelect from "@src/containers/locale-select";
import useTranslate from "@src/hooks/use-translate";
import propTypes from "prop-types";
import React from "react";

function HeadContainer(props) {

  const {t} = useTranslate();

  return (
    <LayoutHead title={t(props.title)} fixed={props.fixed}>
      <LocaleSelect/>
    </LayoutHead>
  );
}

HeadContainer.propTypes = {
  title: propTypes.string,
  fixed: propTypes.bool
}

HeadContainer.defaultProps = {
  title: 'title'
}

export default React.memo(HeadContainer);
