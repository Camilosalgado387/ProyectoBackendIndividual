import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../user/v1/models/user.model';

const secretKey = process.env.JWT_SECRET || 'your_secret_key';

// Actualizamos la interfaz `AuthenticatedRequest` para reflejar la nueva estructura de permisos
export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    canCreate: boolean;
    canDelete: boolean;
    canEdit: boolean;
  };
}

// Middleware para autenticar el token y obtener los permisos
export const authenticateToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token missing or invalid' });
  }

  try {
    // Verificar y decodificar el token
    const decodedToken = jwt.verify(token, secretKey) as { id: string };
    
    // Obtener el usuario desde la base de datos
    const user = await UserModel.findById(decodedToken.id);
    if (!user || !user.isActive) {
      return res.status(404).json({ message: 'User not found or inactive' });
    }

    // Añadir la información del usuario y permisos al objeto `req.user`
    req.user = {
      id: user._id.toString(),
      canCreate: user.canCreate,
      canDelete: user.canDelete,
      canEdit: user.canEdit,
    };

    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token is invalid or expired' });
  }
};

// Middleware para verificar los permisos
export const checkPermissions = (permissionType: 'canCreate' | 'canDelete' | 'canEdit') => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Depuración: Verificar los permisos del usuario
    console.log('User Permissions:', req.user);
    console.log(`Checking permission for: ${permissionType}`);

    // Verificar si el usuario tiene el permiso específico
    if (!req.user[permissionType]) {
      return res.status(403).json({ message: `Forbidden: Missing ${String(permissionType)} permission` });
    }

    next();
  };
};
