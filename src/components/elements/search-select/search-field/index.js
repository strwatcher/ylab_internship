import propTypes from "prop-types";
import React, { useCallback } from "react";
import s from "./style.module.scss";

SearchField.propTypes = {
  searchRef: propTypes.object.isRequired,
  filter: propTypes.string,
  onChange: propTypes.func,
};

function SearchField({ onChange, filter, searchRef }) {
  const changeCallback = useCallback((event) => {
    return onChange(event.target.value);
  });
  return (
    <input
      ref={searchRef}
      className={s.searchField}
      onChange={changeCallback}
      placeholder="Поиск"
      value={filter}
    ></input>
  );
}

export default React.memo(SearchField);
