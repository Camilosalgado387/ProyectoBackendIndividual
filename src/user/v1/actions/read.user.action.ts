import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserModel } from '../models/user.model'

const secretKey = process.env.JWT_SECRET || 'your_secret_key'

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    // Buscar al usuario por correo electrónico
    const user = await UserModel.findOne({ email, isActive: true })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Comparar la contraseña con bcrypt
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Generar token JWT
    const token = jwt.sign(
      {
        id: user._id.toString(), // Asegúrate de que el ID sea una cadena
        canCreate: user.canCreate,
        canDelete: user.canDeleteUsers,
        canEdit: user.canEditUsers,
        canDeleteBooks: user.canDeleteBooks,
        canEditBooks: user.canEditBooks,
        
      },
      secretKey,
      { expiresIn: '1h' }
    )

    res.json({ message: 'Login successful', token })
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error })
  }
}
