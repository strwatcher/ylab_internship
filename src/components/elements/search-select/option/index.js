import { joinClasses } from "@src/utils/join-classes";
import React from "react";
import s from "../style.module.scss";

function Option({
  title,
  iconString,
  selectable,
  selected,
  onClick,
  onKeyDown,
  selectedRef,
}) {
  return (
    <li
      ref={selectedRef}
      className={joinClasses(s.option, selectable && s.selectable)}
      onClick={onClick}
      onKeyDown={onKeyDown}
      role={"option"}
      aria-selected={selected}
      tabIndex={selectable && -1}
    >
      <div className={s.option_icon}>{iconString}</div>
      <div className={s.option_title}>{title}</div>
    </li>
  );
}

export default React.memo(Option);
