
import { CreateBookType } from "../book.types";
import { bookModel, bookType } from "../models/book.model";
// DECLARE ACTION FUNCTION
async function createBookAction(bookData: CreateBookType): Promise<bookType> {
  const results = await bookModel.create(bookData);

  return results;
}

// EXPORT ACTION FUNCTION
export default createBookAction;
