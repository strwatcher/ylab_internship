import { Actions } from "../actions";
import { PayloadAction } from "../types";

export interface LoadSuccessAction extends PayloadAction<ArticleData> {
  type: Actions.ArticleLoadSuccess;
}

export interface LoadErrorAction extends PayloadAction<null> {
  type: Actions.ArticleLoadError;
}

export interface LoadAction extends PayloadAction<null> {
  type: Actions.ArticleLoad;
}

export interface ArticleState {
  data: ArticleData;
  waiting: boolean;
}

export interface ArticleData {
  _id?: string;
  description?: string;
  category?: string;
  edition?: number;
  maidIn?: {
    title?: string;
    code?: string;
  };
  price?: number;
  title?: string;
}
