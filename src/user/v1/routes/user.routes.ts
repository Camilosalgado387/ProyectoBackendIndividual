import { Router, Request, Response } from 'express'
import { createUser, readUsers } from '../Controllers/user.controller'
import { CreateUserType } from '../user.types'
import { authenticateToken, checkPermissions, AuthenticatedRequest, checkEditPermissions, checkDisablePermissions } from '../../../middleware/auth'
import { loginUser } from '../actions/read.user.action'
import { updateUser} from '../Controllers/user.controller'
import { disableUser } from '../Controllers/user.controller'
const userRoutes = Router()

async function GetUsers(request: Request, response: Response) {
  const users = await readUsers()
  response.status(200).json({ message: 'Success.', users })
}

async function CreateUser(request: Request, response: Response) {
  if (!request.body.name) {
    return response.status(400).json({ message: 'Missing fields' })
  }
  
  try {
    const user = await createUser(request.body)
    response.status(201).json({ message: 'User created successfully', user })
  } catch (error) {
    response.status(500).json({ message: 'Failure', information: (error as any).toString() })
  }
}

async function UpdateUser(request: AuthenticatedRequest, response: Response) {
  const targetUserId = request.params.userId
  const updateData = request.body

  try {
    const updatedUser = await updateUser(targetUserId, updateData)
    if (!updatedUser) {
      return response.status(404).json({ message: 'User not found' })
    }

    response.status(200).json({ message: 'User updated successfully', user: updatedUser })
  } catch (error) {
    response.status(500).json({ message: 'Failed to update user', error })
  }
}

async function DisableUser(request: AuthenticatedRequest, response: Response) {
  const targetUserId = request.params.userId

  try {
    const disabledUser = await disableUser(targetUserId)
    if (!disabledUser) {
      return response.status(404).json({ message: 'User not found' })
    }

    response.status(200).json({ message: 'User disabled successfully', user: disabledUser })
  } catch (error) {
    response.status(500).json({ message: 'Failed to disable user', error })
  }
}




// Rutas protegidas
// userRoutes.get('/', authenticateToken, GetUsers) //OJO, LEER USERS NO REQUIERE AUTENTICACIÓN
userRoutes.get('/login', loginUser)
userRoutes.post('/', CreateUser)
userRoutes.put('/:userId',  authenticateToken, checkEditPermissions,UpdateUser)
userRoutes.delete('/:userId', authenticateToken,checkDisablePermissions, DisableUser)

export default userRoutes
