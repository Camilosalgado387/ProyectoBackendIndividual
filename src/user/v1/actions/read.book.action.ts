import { bookModel, bookType } from "../models/book.model";

// DECLARE ACTION FUNCTION
async function readbookAction(): Promise<bookType[]> {
  const results = await bookModel.find();

  return results;
}

// EXPORT ACTION FUNCTION
export default readbookAction;