import { BookType } from "./models/book.model";

export type CreateBookType = Omit<BookType, "_id">
export type UpdateBookType = Omit<Partial<BookType>, "_id">
