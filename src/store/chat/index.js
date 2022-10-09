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
      authResolve: null,
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

  send(method, payload) {
    this.getState().socket?.send(JSON.stringify({ method, payload }));
  }

  async auth() {
    return new Promise((resolve) => {
      this.send("auth", { token: this.getState().token });
      this.setState({
        ...this.getState(),
        authResolve: resolve,
      });
    });
  }

  async authedOperation(callback) {
    while (!this.getState().signed) {
      await this.auth();
    }

    callback();
  }

  async getLast(fromDate) {
    this.authedOperation(() => this.send("last", { fromDate }));
  }

  async getOld(fromId) {
    this.authedOperation(() => this.send("old", { fromId }));
  }

  post(message) {
    this.authedOperation(() => {
      const newMessage = { ...message, _key: uuidv4() };
      this.send("post", { ...newMessage });
      this.setState({
        ...this.getState(),
        messages: [...this.getState().messages, { ...newMessage }],
      });
    });
  }

  #onopen = () => {
    console.log("opened");
    console.log("signed: " + this.getState().signed);
    this.getLast()
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
    console.log(json);
    switch (json.method) {
      case "auth":
        this.#onauth(json);
        console.log("signed: " + this.getState().signed);
        break;
      case "last":
        this.#ongetlast(json);
        break;
      case "post":
        this.#onpost(json);
        break;
    }
  };

  #onauth = (json) => {
    this.getState().authResolve(json.payload.result);
    this.setState({
      ...this.getState(),
      signed: json.payload.result,
    });
  };

  #ongetlast = (json) => {
    let messages = [...this.getState().messages];
    json.payload.items.forEach(message => {
      const index = messages.findIndex(i => i._id === message._id);
      if (index >= 0) {
        messages[index] = message;
      }
      else {
        messages.push(message)
      }
    })
    console.log(messages);
    this.setState({
      ...this.getState(),
      messages,
    });
  };

  #onpost = (json) => {
    let messages = [...this.getState().messages];
    const messageIndex = messages.findIndex(
      (i) => i._key === json.payload._key
    );
    console.log(messageIndex);
    if (messageIndex >= 0) {
      messages[messageIndex] = json.payload;
    } else {
      messages = [...messages, json.payload];
    }
    this.setState({
      ...this.getState(),
      messages,
    });
  };
}

export default ChatState;
