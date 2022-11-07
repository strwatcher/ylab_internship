export interface BasketState {
  items: BasketItem[];
  sum: number;
  amount: number;
}

export interface BasketItem {
  _id: string;
  title: string;
  price: number;
  amount: number;
}
