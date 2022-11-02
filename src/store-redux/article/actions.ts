import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import Services from "../../services";
import { Actions } from "../actions";
import { ActionCreator } from "../types";
import {
  ArticleData,
  LoadAction,
  LoadErrorAction,
  LoadSuccessAction,
} from "./types";

const loadSuccesCreator: ActionCreator<LoadSuccessAction, [ArticleData]> = (
  data
) => ({
  type: Actions.ArticleLoadSuccess,
  payload: data,
});

const loadErrorCreator: ActionCreator<LoadErrorAction, []> = () => ({
  type: Actions.ArticleLoadError,
  payload: null,
});

const loadCreator: ActionCreator<LoadAction, []> = () => ({
  type: Actions.ArticleLoad,
  payload: null,
});

const load: (_id: string) => ThunkAction<void, any, Services, AnyAction> = (
  _id
) => {
  return async (dispatch, getState, services) => {
    dispatch(loadCreator());

    try {
      const json = await services.api.request({
        url: `/api/v1/articles/${_id}?fields=*,maidIn(title,code),category(title)`,
      });
      // Товар загружен успешно
      dispatch(loadSuccesCreator(json.result));
    } catch (e) {
      // Ошибка при загрузке
      dispatch(loadErrorCreator());
    }
  };
};

export default {
  load,
};
