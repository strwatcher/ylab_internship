import useInit from "@src/hooks/use-init";
import useSelector from "@src/hooks/use-selector";
import useStore from "@src/hooks/use-store";
import React from "react";

function Chat() {
  const store = useStore();

  const select = useSelector((state) => ({
    messages: state.chat.messages,
    token: state.session.token,
    author: state.profile.data
  }));

  useInit(() => {
    store.get("chat").connect(select.token);
  }, []);

  const callbacks = {
    send: () => {
      const message = {
        text: "test"
      }

      store.get("chat").post(message)
    }
  }
  return (
    <>
      {select.messages.map((item) => (
        <div key={item._key}>{item.text}</div>
      ))}
      <button onClick={callbacks.send}>Create message</button>
    </>
  );
}

export default React.memo(Chat);
