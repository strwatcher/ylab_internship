import AddDialogModule from "./add-dialog";
import { AddDialogState } from "./add-dialog/types";
import ArticleModule from "./article";
import { ArticleState } from "./article/types";
import BasketModule from "./basket";
import { BasketState } from "./basket/types";
import CatalogModule from "./catalog";
import { CatalogState } from "./catalog/types";
import CategoriesModule from "./categories";
import { CategoriesState } from "./categories/types";
import ChatModule from "./chat";
import { ChatState } from "./chat/types";
import DrawingModule from "./drawing";
import { DrawingState } from "./drawing/types";
import LocaleModule from "./locale";
import { LocaleState } from "./locale/types";
import ModalsModule from "./modals";
import { ModalsState } from "./modals/types";
import StateModule from "./module";
import MultiModalityModule from "./multi-modality";
import { MultiModalityState } from "./multi-modality/types";
import MultiselectBasketModule from "./multiselect-basket";
import { MultiselectBasketState } from "./multiselect-basket/types";
import ProfileModule from "./profile";
import { ProfileState } from "./profile/types";
import SessionModule from "./session";
import { SessionState } from "./session/types";

export const modules = {
  addDialog: AddDialogModule,
  article: ArticleModule,
  basket: BasketModule,
  catalog: CatalogModule,
  categories: CategoriesModule,
  chat: ChatModule,
  drawing: DrawingModule,
  locale: LocaleModule,
  modals: ModalsModule,
  multiModality: MultiModalityModule,
  multiselectBasket: MultiselectBasketModule,
  profile: ProfileModule,
  session: SessionModule,
};

export type SomeState =
  | AddDialogState
  | ArticleState
  | BasketState
  | CatalogState
  | CategoriesState
  | ChatState
  | DrawingState
  | LocaleState
  | ModalsState
  | MultiModalityState
  | MultiselectBasketState
  | ProfileState
  | SessionState;

export type Modules = {
  [name: string]: StateModule<SomeState>;
};

export type State = {
  [name: string]: SomeState;
};
