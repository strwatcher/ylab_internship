import React from "react";
import s from "./style.module.scss";

function List({ messages, render }) {
  return (
    <div className={s.list}>
      {messages.map((message) => render(message))}
    </div>
  );
}

export default React.memo(List);
