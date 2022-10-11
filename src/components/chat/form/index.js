import React, { useCallback } from "react";
import s from "./style.module.scss";

function Form({ value, onChange, send, text }) {
  const callbacks = {
    onEnter: useCallback(e => {
      if (e.key === "Enter") {
        console.log(e.key)
        send();
      }
    }, [send]) 
  }
  return (
    <div className={s.form}>
      <input
        className={s.input}
        value={value}
        placeholder={text.placeholder}
        onChange={onChange}

        onKeyDown={callbacks.onEnter}
      ></input>
      <button className={s.send} onClick={send}>
        {text.send}
      </button>
    </div>
  );
}

export default React.memo(Form);
