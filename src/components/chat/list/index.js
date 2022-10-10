import React from "react";
import s from "./style.module.scss";

function List({ messages, render, topRef, chatRef }) {
  return (
    <div className={s.list} ref={chatRef}>
      <div className={s.top} ref={topRef}></div>
      {messages.map((message, index) => render(message, index))}
    </div>
  );
}

export default React.memo(List);
