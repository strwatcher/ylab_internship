import Form from "@src/components/chat/form";
import List from "@src/components/chat/list";
import Message from "@src/components/chat/message";
import Layout from "@src/components/layouts/layout";
import HeadContainer from "@src/containers/head";
import { useInfinityScroll } from "@src/hooks/use-infinity-scroll";
import useInit from "@src/hooks/use-init";
import useSelector from "@src/hooks/use-selector";
import useStore from "@src/hooks/use-store";
import React, { useCallback, useRef } from "react";

function Chat() {
  const store = useStore();

  const select = useSelector((state) => ({
    messages: state.chat.messages,
    token: state.session.token,
    author: state.profile.data,
    message: state.chat.message,
    waiting: state.chat.waiting,
    connected: state.chat.connected,
    action: state.chat.action
  }));

  const callbacks = {
    setMessage: useCallback((e) => {
      store.get("chat").setMessage(e.target.value);
    }, []),

    send: useCallback(() => {
      store
        .get("chat")
        .post({ text: select.message, username: select.author.username });

      store.get("chat").setMessage("");
      lastMessage.current?.scrollIntoView();
    }, [select.author, select.message]),

    load: useCallback(async () => {
      console.log(select.connected);
      if (select.connected && select.messages.length) {
        await store.get("chat").getOld();
        firstMessage.current?.scrollIntoView();
      }
    }, [select.connected, select.messages]),
  };

  useInit(async () => {
    await store.get("profile").load();
    await store.get("chat").connect(select.token);
  }, []);

  const firstMessage = useRef(null);
  const lastMessage = useRef(null);
  const chatRef = useCallback(
    (node) => {
      const bottom =
        node?.scrollHeight - node?.scrollTop <= node?.clientHeight * 1.2;
      if (bottom && select.action !== 'old') {
        lastMessage.current?.scrollIntoView();
      }
    },
    [select.messages]
  );
  const topRef = useInfinityScroll(select.waiting, true, callbacks.load);

  return (
    <Layout>
      <HeadContainer title={"Чат"} fixed />
      <List
        messages={select.messages}
        chatRef={chatRef}
        topRef={topRef}
        render={(message, index) => {
          let ref;
          if (index === 0) {
            ref = firstMessage;
          } else if (index === select.messages.length - 1) {
            ref = lastMessage;
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
