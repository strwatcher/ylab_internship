import { IDict } from "../types";
export interface Node extends IDict<any> {
  parent?: Node;
  children?: Array<Node>;
  _id: any;
}
