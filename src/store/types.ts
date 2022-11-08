import AddDialogModule from "./add-dialog";
import ArticleModule from "./article";
import BasketModule from "./basket";
import CatalogModule from "./catalog";
import CategoriesModule from "./categories";
import ChatModule from "./chat";
import DrawingModule from "./drawing";
import LocaleModule from "./locale";
import ModalsModule from "./modals";
import MultiModalityModule from "./multi-modality";
import MultiselectBasketModule from "./multiselect-basket";
import ProfileModule from "./profile";
import SessionModule from "./session";

export let modules = {
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

export type IModules = typeof modules;

export type IStoreModules = StaticStoreModules & DynamicStoreModules;

export type StaticStoreModules = {
  [P in keyof IModules]: InstanceType<IModules[P]>;
};

export type DynamicStoreModules = {
  [name: string]: InstanceType<IModules[keyof IModules]>;
};

export type State = StaticState & DynamicState;

type StaticState = {
  [P in keyof StaticStoreModules]: ReturnType<
    StaticStoreModules[P]["initState"]
  >;
};

type DynamicState = {
  [name: string]: ReturnType<
    DynamicStoreModules[keyof DynamicStoreModules]["initState"]
  >;
};
