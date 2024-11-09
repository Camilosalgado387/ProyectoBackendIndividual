import { BookModel } from "../models/book.model"
import { BookType } from "../models/book.model"

export const updateBookAction = async (bookId: string, updateData: Partial<BookType>): Promise<BookType | null> => {
  return await BookModel.findByIdAndUpdate(bookId, updateData, { new: true })
}
