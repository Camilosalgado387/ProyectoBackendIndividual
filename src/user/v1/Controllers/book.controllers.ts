import { createBookAction } from "../actions/create.book.action";
import { BookType } from "../models/book.model";

export async function createBook(bookData: BookType): Promise<BookType> {
  const newBook = await createBookAction(bookData);
  return newBook;
}
