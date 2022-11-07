export interface CatalogParams {
  page?: number;
  limit?: number;
  sort?: string;
  query?: string;
  category?: string;
}

export interface CatalogItem {
  _id: string;
  title: string;
  price: string;
}

export interface CatalogState {
  items: CatalogItem[];
  count: number;
  params: CatalogParams;
  hasMore: boolean;
  waiting: boolean;
}

export interface QSParams {
  [ns: string]: CatalogParams;
}
