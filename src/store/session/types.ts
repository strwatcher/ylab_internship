export interface Issue {
  accept: boolean;
  message: string;
  path: Array<string>;
  rule: string;
}

export interface SessionState {
  user?: User;
  token?: string;
  errors?: Map<string, Array<string>>;
  exists?: boolean;
  waiting?: boolean;
}

export interface User {
  _id?: string;
  name?: string;
}

export interface SignInData {
  login: string;
  password: string;
}
