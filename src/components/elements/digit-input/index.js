import React, { useCallback } from 'react';
import s from './style.module.scss';

function DigitInput({ onChange, value }) {
  
  const callbacks = {
    increase: useCallback(() => onChange(value + 1), [value]),
    decrease: useCallback(() => onChange(value - 1), [value]),
    onChange: (e) => onChange(e.target.value)
  }

  return (
    <div className={s.wrapper}>
      <button onClick={callbacks.decrease}>-</button>
      <input value={value} onChange={callbacks.onChange}></input>
      <button onClick={callbacks.increase}>+</button>
    </div>
  );
}

export default React.memo(DigitInput);
