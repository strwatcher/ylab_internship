import { IDict } from "../types";

export interface Node extends IDict<any> {
  children?: Array<Node>;
  _id: any;
}
