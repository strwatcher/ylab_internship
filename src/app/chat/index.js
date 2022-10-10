import Form from "@src/components/chat/form";
import List from "@src/components/chat/list";
import Message from "@src/components/chat/message";
import Layout from "@src/components/layouts/layout";
import HeadContainer from "@src/containers/head";
import useInit from "@src/hooks/use-init";
import useSelector from "@src/hooks/use-selector";
import useStore from "@src/hooks/use-store";
import React from "react";

function Chat() {
  const store = useStore();

  const select = useSelector((state) => ({
    messages: state.chat.messages,
    token: state.session.token,
    author: state.profile.data,
  }));

  useInit(async () => {
    await store.get("profile").load();
    store.get("chat").connect(select.token);
  }, []);

  const callbacks = {
    send: () => {
      const message = {
        text: "test",
      };

      store.get("chat").post(message, select.author.username);
    },
    load: () => {
      store.get("chat").getOld();
    },
  };
  return (
    <Layout>
      <HeadContainer title={"Чат"} fixed/>
      <List
        messages={select.messages}
        render={(message) => (
          <Message
            key={message._key}
            message={message}
            mine={message.mine || message.author._id === select.author._id}
          />
        )}
      />
      <Form />
    </Layout>
  );
}

export default React.memo(Chat);
