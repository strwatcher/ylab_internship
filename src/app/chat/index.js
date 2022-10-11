import Form from "@src/components/chat/form";
import List from "@src/components/chat/list";
import Message from "@src/components/chat/message";
import Layout from "@src/components/layouts/layout";
import HeadContainer from "@src/containers/head";
import { useInfinityScroll } from "@src/hooks/use-infinity-scroll";
import useInit from "@src/hooks/use-init";
import useSelector from "@src/hooks/use-selector";
import useStore from "@src/hooks/use-store";
import React, { useCallback, useLayoutEffect, useRef } from "react";

function Chat() {
  const store = useStore();
  const select = useSelector((state) => ({
    messages: state.chat.messages,
    message: state.chat.message,
    waiting: state.chat.waiting,
    connected: state.chat.connected,
    action: state.chat.action,
    token: state.session.token,
    author: state.profile.data,
  }));

  const callbacks = {
    setMessage: useCallback((e) => {
      store.get("chat").setMessage(e.target.value);
    }, []),

    send: useCallback(() => {
      store.get("chat").setMessage("");
      store
        .get("chat")
        .post({ text: select.message, username: select.author.username });
    }, [select.author, select.message]),

    load: useCallback(async () => {
      if (select.connected && select.messages.length) {
        refs.prevFirst.current = refs.first.current;
        await store.get("chat").getOld();
      }
    }, [select.connected, select.messages]),
  };

  // refs to controll scroll
  const refs = {
    load: useInfinityScroll(select.waiting, true, callbacks.load),
    first: useRef(null),
    prevFirst: useRef(null),
    last: useRef(null),
    list: useRef(null)
  }

  useInit(async () => {
    await store.get("profile").load();
    await store.get("chat").connect(select.token);
  }, []);

  useLayoutEffect(() => {
    switch (select.action) {
      case "old":
        refs.prevFirst.current?.scrollIntoView();
        break;

      case "last":
        const bottom =
          refs.list.current?.scrollHeight - refs.list.current?.scrollTop <=
          refs.list.current?.clientHeight * 1.4;

        if (bottom) {
          refs.last.current?.scrollIntoView();
        }
        break;

      case "post":
        refs.last.current?.scrollIntoView();
    }
  }, [select.action, select.messages]);

  return (
    <Layout>
      <HeadContainer title={"Чат"} fixed />
      <List
        messages={select.messages}
        listRef={refs.list}
        loadRef={refs.load}
        render={(message, index) => {
          let ref;
          if (index === 0) {
            ref = refs.first;
          } else if (index === select.messages.length - 1) {
            ref = refs.last;
          }
          return (
            <Message
              ref={ref}
              key={message._key}
              message={message}
              mine={message.mine || message.author._id === select.author._id}
            />
          );
        }}
      />
      <Form
        onChange={callbacks.setMessage}
        send={callbacks.send}
        value={select.message}
      />
    </Layout>
  );
}

export default React.memo(Chat);
