import { joinClasses } from "@src/utils/join-classes";
import React from "react";
import s from "./style.module.scss";

function Message({ message, mine }) {
  return (
    <div
      className={joinClasses(
        s.message,
        mine ? s.message_mine : s.message_others
      )}
    >
      <div className={s.head}>
        <div className={s.username}>{message.author.username}</div>
        <div className={s.dateCreate}>
          {message.dateCreate
            ? new Date(message.dateCreate).toLocaleString("ru-RU")
            : "..."}
        </div>
      </div>
      <div className={s.body}>{message.text}</div>
      <div className={s.bottom}>
        <div
          className={joinClasses(
            s.status,
            message._id ? s.status_approved : s.status_sent
          )}
        />
      </div>
    </div>
  );
}

export default React.memo(Message);
