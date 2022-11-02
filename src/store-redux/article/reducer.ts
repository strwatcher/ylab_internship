import { ArticleState } from "./types";
import { Actions } from "../actions";
import { PayloadAction } from "../types";

// Начальное состояние товара
const initialState: ArticleState = {
  data: {},
  waiting: false,
};

export default function reducer(
  state: ArticleState = initialState,
  action: PayloadAction<any>
): ArticleState {
  switch (action.type) {
    case Actions.ArticleLoad:
      return { ...state, data: {}, waiting: true };

    case Actions.ArticleLoadSuccess:
      return { ...state, data: action.payload, waiting: false };

    case Actions.ArticleLoadError:
      return { ...state, data: {}, waiting: false }; //@todo текст ошибки сохранить?

    default:
      // Нет изменений
      return state;
  }
}
