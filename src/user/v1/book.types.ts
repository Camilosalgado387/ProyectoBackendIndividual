import { bookType } from "./models/book.model";

export type CreateBookType = Omit<bookType, "_id">
export type UpdateBookType = Omit<Partial<bookType>, "_id">
