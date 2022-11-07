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
