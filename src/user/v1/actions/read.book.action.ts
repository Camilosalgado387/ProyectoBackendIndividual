import { BookModel, BookType } from "../models/book.model";

// DECLARE ACTION FUNCTION
async function readbookAction(): Promise<BookType[]> {
  const results = await BookModel.find();

  return results;
}

// EXPORT ACTION FUNCTION
export default readbookAction;