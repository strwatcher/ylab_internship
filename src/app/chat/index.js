import Form from "@src/components/chat/form";
import List from "@src/components/chat/list";
import Message from "@src/components/chat/message";
import Layout from "@src/components/layouts/layout";
import Head from "@src/containers/head";
import Tools from "@src/containers/tools";
import Top from "@src/containers/top";
import { useInfinityScroll } from "@src/hooks/use-infinity-scroll";
import useInit from "@src/hooks/use-init";
import useSelector from "@src/hooks/use-selector";
import useStore from "@src/hooks/use-store";
import useTranslate from "@src/hooks/use-translate";
import React, { useCallback, useEffect, useLayoutEffect, useRef } from "react";

function Chat() {
  const store = useStore();
  const { t } = useTranslate();

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
      if (/^[\s]*$/.test(select.message)) return;
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

  const renders = {
    message: useCallback(
      (message, index) => {
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
      },
      [select.messages, select.author]
    ),
  };

  useInit({
    callback: async () => {
      store.get("chat").connect(select.token);
      await store.get("profile").load();
    },
    depends: [],
  });

  useEffect(() => {
    return () => {
      store.get("chat").clear();
      store.get("chat").disconnect();
    };
  }, []);

  // refs to controll scroll
  const refs = {
    load: useInfinityScroll(select.waiting, true, callbacks.load),
    first: useRef(null),
    prevFirst: useRef(null),
    last: useRef(null),
    list: useRef(null),
  };

  useLayoutEffect(() => {
    switch (select.action) {
      case "old":
        refs.prevFirst.current?.scrollIntoView();
        // this offset is eq to gap in messages list
        refs.list.current.scrollTop -= 20;
        break;

      case "last":
        // bottom is when we under 1.7 of clientHeight of chat element
        const bottom =
          refs.list.current?.scrollHeight - refs.list.current?.scrollTop <=
          refs.list.current?.clientHeight * 1.7;

        if (bottom) {
          refs.last.current?.scrollIntoView();
        }
        break;
      case "post":
        refs.last.current?.scrollIntoView();
        break;
    }
  }, [select.action, select.messages]);

  return (
    <Layout>
      <Top />
      <Head title={t("chat.title")} />
      <Tools />
      <List
        messages={select.messages}
        listRef={refs.list}
        loadRef={refs.load}
        render={renders.message}
      />
      <Form
        onChange={callbacks.setMessage}
        send={callbacks.send}
        value={select.message}
        text={{
          placeholder: t("chat.placeholder"),
          send: t("chat.send"),
        }}
      />
    </Layout>
  );
}

export default React.memo(Chat);
