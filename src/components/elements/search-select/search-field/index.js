import React, { useCallback } from "react";
import s from "./style.module.scss";

function SearchField({ onChange, filter }, ref) {
  const changeCallback = useCallback((event) => {
    return onChange(event.target.value);
  });
  return (
    <input
      ref={ref}
      className={s.searchField}
      onChange={changeCallback}
      placeholder="Поиск"
      value={filter}
    ></input>
  );
}

export default React.memo(React.forwardRef(SearchField));
