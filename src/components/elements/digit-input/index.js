import React, { useCallback } from "react";
import s from "./style.module.scss";

function DigitInput({ onChange, value }) {
  const callbacks = {
    increase: useCallback(
      (e) => {
        e.stopPropagation();
        onChange(parseInt(value) + 1);
      },
      [value]
    ),
    decrease: useCallback(
      (e) => {
        e.stopPropagation();
        onChange(value - 1);
      },
      [value]
    ),
  };

  return (
    <div className={s.wrapper}>
      <button onClick={callbacks.decrease}>-</button>
      <div>{value}</div>
      <button onClick={callbacks.increase}>+</button>
    </div>
  );
}

export default React.memo(DigitInput);
