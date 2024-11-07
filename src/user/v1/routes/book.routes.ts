import { Router, Request, Response } from 'express';
import { createBook } from '../Controllers/book.controllers';
import { authenticateToken, checkPermissions} from '../../../middleware/auth';

const bookRoutes = Router();

async function CreateBook(request: Request, response: Response) {
  if (!request.body.title || !request.body.author || !request.body.genre || !request.body.publishedDate) {
    return response.status(400).json({ message: 'Missing fields' });
  }

  try {
    const newBook = await createBook(request.body);
    response.status(201).json({ message: 'Book created successfully', book: newBook });
  } catch (error) {
    response.status(500).json({ message: 'Failed to create book', error });
  }
}

// Ruta protegida para crear libros
bookRoutes.post('/', authenticateToken, checkPermissions('canCreate'), async (request: Request, response: Response) => {
  try {
    const newBook = await createBook(request.body);
    response.status(201).json({ message: 'Book created successfully', book: newBook });
  } catch (error) {
    response.status(500).json({ message: 'Failed to create book', error });
  }
});

export default bookRoutes;
