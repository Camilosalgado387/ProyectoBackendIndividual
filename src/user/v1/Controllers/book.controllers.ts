import createBookAction from "../actions/create.book.action"
import readbookAction from "../actions/read.book.action"
import { CreateBookType } from "../book.types"
import { bookType } from "../models/book.model"
// DECLARE CONTROLLER FUNCTIONS
async function readBooks(): Promise<bookType[]> {
  const books = await readbookAction()

  return books
}
async function createBook(bookData: CreateBookType): Promise<bookType> {
  const createdBook = await createBookAction(bookData)

  return createdBook
}

// EXPORT CONTROLLER FUNCTIONS
export { createBook, readBooks }
