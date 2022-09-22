import { joinClasses } from "@src/utils/join-classes";
import React, { useState } from "react";
import s from "./style.module.scss";

function SearchSelect() {
  const [show, setShow] = useState(false);

  return (
    <div className={s.wrapper}>
      <div
        className={s.head}
        onClick={() => {
          setShow(!show);
        }}
      ></div>
      <div className={joinClasses(s.body, show && s.body_show)}></div>
    </div>
  );
}

export default React.memo(SearchSelect);
