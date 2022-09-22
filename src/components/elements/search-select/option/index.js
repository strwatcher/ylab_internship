import React from "react";
import s from "./style.module.scss";

function Option() {
  return <div className={s.wrapper}></div>;
}

export default React.memo(Option);
