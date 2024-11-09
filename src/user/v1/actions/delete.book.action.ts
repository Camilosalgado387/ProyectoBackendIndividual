import { BookModel } from "../models/book.model"
import { BookType } from "../models/book.model"

export const disableBookAction = async (bookId: string): Promise<BookType | null> => {
  return await BookModel.findByIdAndUpdate(bookId, { isActive: false }, { new: true })
}
