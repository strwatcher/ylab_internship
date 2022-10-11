import React from "react";
import s from "./style.module.scss";

function Form({ value, onChange, send, text }) {
  return (
    <div className={s.form}>
      <input
        className={s.input}
        value={value}
        placeholder={text.placeholder}
        onChange={onChange}
      ></input>
      <button className={s.send} onClick={send}>
        {text.send}
      </button>
    </div>
  );
}

export default React.memo(Form);
