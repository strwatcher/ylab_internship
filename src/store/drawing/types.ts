import { BaseShape } from "@src/drawing/base";

export interface DrawingState {
  shapes?: BaseShape[];
  origin?: { x: number; y: number };
  scale?: number;
  selected?: BaseShape;
  width?: number;
  height?: number;
}

export interface Attr<T = any> {
  name: string;
  value: T;
}
