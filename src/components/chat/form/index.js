import React from "react";
import s from "./style.module.scss";

function Form({}) {
  return <div className={s.form}>
    <input className={s.input} placeholder={'Ваше сообщение...'}></input>
    <button className={s.send}>Отправить</button>
  </div>;
}

export default React.memo(Form);
