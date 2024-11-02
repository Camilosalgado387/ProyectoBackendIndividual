import { Router, Request, Response } from "express";
import { createBook, readBooks } from "../Controllers/book.controllers";
import { CreateBookType } from "../book.types";
const bookRoutes = Router();

async function GetBooks(request: Request, response: Response) {
    const books = await readBooks();
  
    response.status(200).json({
      message: "Success.",
      books: books,
    });
  }
  async function CreateBook(request: Request<CreateBookType>, response: Response) {
    if (request.body.name === undefined) {
      return response.status(400).json({
        message: "Missing fields"
      })
    }
  
    try {
      const books = await createBook(request.body);
      
      response.status(200).json({
        message: "Success.",
        books: books,
      });
  
    } catch (error) {
      response.status(500).json({
        message: "Failure",
        information: (error as any).toString()
      })
    }
  }




//Endpoints

bookRoutes.get("/", GetBooks)
bookRoutes.post("/", CreateBook)
export default bookRoutes