import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";

export type ThunkAction<R, S, E, A extends Action> = (
  dispatch: ThunkDispatch<S, E, A>,
  getState: () => S,
  services: E
) => R;

export interface PayloadAction<P> extends Action {
  payload: P;
}

export type ActionCreator<
  A extends PayloadAction<any>,
  P extends Array<any>
> = (...args: P) => A;
