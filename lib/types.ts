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
  roles?: string[];
  id?: string;
};

export type Review = {
  id: string;
  rating: number;
  review_text: string;
  reviewer: User;
  book: Book;
};

export enum UserRole {
  ADMIN = "ROLE_ADMIN",
  USER = "ROLE_USER",
  MOD = "ROLE_MOD",
}
