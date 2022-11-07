export interface OptionItem {
  _id: string;
  title: string;
  value: string;
}

export interface CategoriesState {
  items: OptionItem[];
  waiting: boolean;
}
