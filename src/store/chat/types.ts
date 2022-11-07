export interface ChatState {
  signed: boolean;
  connected: boolean;
  waiting: boolean;
  messages: Message[];
  resolve?: Function;
  token?: string;
  message: string;
  action: string;
}

export interface Message {
  _id?: string;
  _key?: string;
  mine?: boolean;
  text?: string;
  author?: {
    username: string;
  };
  dateCreate?: string;
}
