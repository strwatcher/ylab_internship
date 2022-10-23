import React from "react";
import propTypes from "prop-types";

import s from "./style.module.scss";

SimpleInput.propTypes = {
  title: propTypes.string,
  type: propTypes.string,
  // value: propTypes.oneOf([propTypes.number,propTypes.string]),
  name: propTypes.string,
  onChange: propTypes.func,
};

SimpleInput.defaultProps = {};

function SimpleInput({ type, value, title, name, onChange, onSubmit }) {
  return (
    <div className={s.wrapper}>
      <label htmlFor={name}>{title}</label>
      <input
        id={name}
        className={s.input}
        value={value}
        onChange={onChange}
        onSubmit={onSubmit}
        type={type}
        name={name}
      />
    </div>
  );
}

export default React.memo(SimpleInput);
