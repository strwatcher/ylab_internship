import StateModule from "@src/store/module";
import { v4 as uuidv4 } from "uuid";

/**
 * Состояние товара
 */
class ChatState extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      socket: null,
      signed: false,
      messages: [],
      resolve: null,
      token: null,
    };
  }

  connect(token) {
    this.setState({
      ...this.getState(),
      token,
      socket: this.services.websockets.connect(
        "ws://example.front.ylab.io/chat",
        {
          onopen: this.#onopen,
          onclose: this.#onclose,
          onerror: this.#onerror,
          onmessage: this.#onmessage,
        }
      ),
    });
  }

  async send(method, payload) {
    return new Promise((resolve) => {
      this.getState().socket?.send(JSON.stringify({ method, payload }));
      this.setState({
        ...this.getState(),
        resolve,
      });
    });
  }

  async auth() {
    const signed = await this.send("auth", { token: this.getState().token });
    this.setState({
      ...this.getState(),
      signed,
    });
  }

  async authedOperation(callback) {
    while (!this.getState().signed) {
      await this.auth();
    }
    return await callback();
  }

  async getLast(fromDate) {
    const last = await this.authedOperation(() =>
      this.send("last", { fromDate })
    );
    let messages = [...this.getState().messages];
    last.forEach((message) => {
      const index = messages.findIndex((i) => i._key === message._key);
      if (index >= 0) {
        messages[index] = message;
      } else {
        messages.push(message);
      }
    });
    console.log(messages);
    this.setState({
      ...this.getState(),
      messages,
    });
  }

  async getOld(fromId) {
    let old = await this.authedOperation(() =>
      this.send("old", { fromId: this.getState().messages.at(0)._id })
    )

    old = old.slice(0, old.length - 1);
    this.setState({
      ...this.getState(),
      messages: [...old, ...this.getState().messages],
    });
  }

  post(message) {
    const newMessage = { ...message, _key: uuidv4(), approved: false };

    this.setState({
      ...this.getState(),
      messages: [...this.getState().messages, { ...newMessage }],
    });

    this.authedOperation(() => {
      this.send("post", { ...newMessage });
    });
  }

  #onopen = () => {
    console.log("opened");
    this.getLast();
  };

  #onclose = () => {
    console.log("closed");
    this.setState({
      ...this.getState(),
      signed: false,
    });
    this.connect(this.getState().token);
  };

  #onerror = () => {
    console.log("error");
    this.setState({
      ...this.getState(),
      signed: false,
    });
    this.connect(this.getState().token);
  };

  #onmessage = (e) => {
    const json = JSON.parse(e.data);
    let result;
    console.log(json);
    switch (json.method) {
      case "auth":
        result = json.payload.result;
        break;
      case "last":
        result = json.payload.items;
        break;
      case "old":
        result = json.payload.items;
        break;
      case "post":
        this.getLast(this.getState().messages.at(-1).dateCreate);
        break;
    }

    const resolve = this.getState().resolve;
    console.log("result is ", result);
    if (resolve && result) {
      resolve(result);
    }
  };
}

export default ChatState;
