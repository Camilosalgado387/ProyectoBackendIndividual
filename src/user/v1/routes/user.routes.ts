import { Router, Request, Response } from 'express';
import { createUser, readUsers } from '../Controllers/user.controller';
import { CreateUserType } from '../user.types';
import { authenticateToken, checkPermissions } from '../../../middleware/auth';
import { loginUser } from '../actions/read.user.action';
const userRoutes = Router();

async function GetUsers(request: Request, response: Response) {
  const users = await readUsers();
  response.status(200).json({ message: 'Success.', users });
}

async function CreateUser(request: Request, response: Response) {
  if (!request.body.name) {
    return response.status(400).json({ message: 'Missing fields' });
  }
  
  try {
    const user = await createUser(request.body);
    response.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    response.status(500).json({ message: 'Failure', information: (error as any).toString() });
  }
}

// Ruta de Login
userRoutes.get('/login', loginUser);

// Rutas protegidas
userRoutes.get('/', authenticateToken, GetUsers); //OJO, LEER USERS NO REQUIERE AUTENTICACIÓN
userRoutes.post('/', CreateUser);

export default userRoutes;
