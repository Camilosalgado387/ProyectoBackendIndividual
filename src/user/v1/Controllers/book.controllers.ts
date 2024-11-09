import { createBookAction } from "../actions/create.book.action"
import { BookType } from "../models/book.model"
import { getBookById, getBooksWithFilters } from "../actions/read.book.action"
import { updateBookAction } from "../actions/update.book.action"
import { disableBookAction } from "../actions/delete.book.action"


export async function createBook(bookData: BookType): Promise<BookType> {
  const newBook = await createBookAction(bookData)
  return newBook
}
export const readBook = async (bookId: string): Promise<BookType | null> => {
  return await getBookById(bookId);
};

export const readBooks = async (filters: Partial<BookType>): Promise<BookType[]> => {
  return await getBooksWithFilters(filters);
};

export const updateBook = async (bookId: string, updateData: Partial<BookType>): Promise<BookType | null> => {
  return await updateBookAction(bookId, updateData);
};

export async function disableBook(bookId: string): Promise<BookType | null> {
  return await disableBookAction(bookId);
}