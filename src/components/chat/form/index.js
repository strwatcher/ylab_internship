import React from "react";
import s from "./style.module.scss";

function Form({ value, onChange, send }) {
  return (
    <div className={s.form}>
      <input
        className={s.input}
        value={value}
        placeholder={"Ваше сообщение..."}
        onChange={onChange}
      ></input>
      <button className={s.send} onClick={send}>
        Отправить
      </button>
    </div>
  );
}

export default React.memo(Form);
