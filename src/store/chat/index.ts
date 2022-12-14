import StateModule from "@src/store/module";
import { v4 as uuidv4 } from "uuid";
import { ChatState, Message } from "./types";

/**
 * Состояние товара
 */
class ChatModule extends StateModule<ChatState> {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState(): ChatState {
    return {
      signed: false,
      connected: false,
      waiting: false,
      messages: [],
      resolve: null,
      token: null,
      message: "",
      action: "",
    };
  }
  clear() {
    this.setState({ ...this.initState() });
  }
  setMessage(message: string) {
    this.setState({
      ...this.getState(),
      message,
    });
  }

  setWaiting(waiting: boolean) {
    this.setState({
      ...this.getState(),
      waiting,
    });
  }

  async connect(token: string) {
    this.setState({
      ...this.getState(),
      token,
    });

    await this.services.websockets.connect(
      "chat",
      "ws://example.front.ylab.io/chat",
      {
        onopen: this.onopen,
        onclose: this.onclose,
        onerror: this.onerror,
        onmessage: this.onmessage,
      }
    );
    this.setState({
      ...this.getState(),
      connected: true,
    });
  }

  disconnect() {
    this.services.websockets.disconnect("chat");
  }

  async send(method: string, payload: any) {
    return new Promise((resolve) => {
      this.services.websockets
        .getSocket("chat")
        .send(JSON.stringify({ method, payload }));
      this.setState({
        ...this.getState(),
        resolve,
      });
    });
  }

  async auth() {
    const signed = !!(await this.send("auth", {
      token: this.getState().token,
    }));
    this.setState({
      ...this.getState(),
      signed,
    });
  }

  async authedOperation(callback: Function) {
    if (!this.getState().signed) {
      await this.auth();
    }
    return await callback();
  }

  async getLast(fromDate?: string) {
    const last: Message[] = await this.authedOperation(() =>
      this.send("last", { fromDate })
    );
    let messages: Message[] = [...this.getState().messages];
    last.forEach((message) => {
      const index = messages.findIndex((i) => i._key === message._key);
      if (index >= 0) {
        messages[index] = message;
      } else {
        messages.push(message);
      }
    });

    messages = messages.sort(
      (a, b) =>
        new Date(a.dateCreate).getTime() - new Date(b.dateCreate).getTime()
    );
    this.setState({
      ...this.getState(),
      messages,
      action: "last",
    });
  }

  async getOld() {
    this.setWaiting(true);
    let old = await this.authedOperation(() =>
      this.send("old", { fromId: this.getState().messages.at(0)._id })
    );

    old = old.slice(0, old.length - 1);
    this.setState({
      ...this.getState(),
      messages: old.concat(this.getState().messages),
      waiting: false,
      action: "old",
    });
  }

  post(message: Message) {
    let newMessage = { text: message.text, _key: uuidv4() };

    this.setState({
      ...this.getState(),
      messages: [
        ...this.getState().messages,
        {
          ...newMessage,
          mine: true,
          author: { username: message.author.username },
        },
      ],
      action: "post",
    });

    this.authedOperation(() => this.send("post", { ...newMessage }));
  }

  onopen = () => {
    // console.log("opened");
    this.services.websockets.approveConnect("chat");
    this.getLast();
  };

  onclose = () => {
    // console.log("closed");
    this.setState({
      ...this.getState(),
      signed: false,
      connected: false,
    });
    this.connect(this.getState().token);
  };

  onerror = () => {
    // console.log("error");
    this.setState({
      ...this.getState(),
      signed: false,
      connected: false,
    });
    this.connect(this.getState().token);
  };

  onmessage = (e: MessageEvent) => {
    const json = JSON.parse(e.data);
    // console.log(json);
    let result;
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
    if (resolve && result) {
      resolve(result);
    }
  };
}

export default ChatModule;
