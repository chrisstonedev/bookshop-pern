export interface IBook {
  id?: number;
  title: string;
  author: string;
}

export interface IBooks {
  books: IBook[];
}

export type IBookMutation = {
  addBook: IBook
}