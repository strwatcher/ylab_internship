import { joinClasses } from "@src/utils/join-classes";
import React, { useState } from "react";
import Arrow from "./arrow";
import Option from "./option";
import s from "./style.module.scss";

function SearchSelect() {
  const [show, setShow] = useState(false);
  const [currentOption, setCurrentOption] = useState(0);

  const handlers = {
    onHeadClick: () => {
      setShow(!show);
    },

    keyboard: (index) => (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        setShow(false);
        setCurrentOption(index);
      }
    },
  };

  return (
    <div className={s.wrapper}>
      <button className={s.head} onClick={handlers.onHeadClick}>
        <Option />
        <Arrow />
      </button>

      <div className={joinClasses(s.body, show && s.body_show)}></div>
    </div>
  );
}

export default React.memo(SearchSelect);
