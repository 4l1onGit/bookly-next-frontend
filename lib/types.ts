export type Book = {
  id: string;
  book_title: string;
  author: string;
  book_cover: string;
  summary: string;
  pages: number;
  genre: string;
};

export type User = {
  email: string;
  password?: string;
};
