import { BookModel } from "../models/book.model"
import { BookType } from "../models/book.model"

export async function createBookAction(bookData: BookType): Promise<BookType> {
  const book = new BookModel(bookData)
  await book.save()
  return book
}
