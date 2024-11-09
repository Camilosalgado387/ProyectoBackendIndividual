import createUserAction from "../userActions/create.user.action"
import { loginUser } from "../userActions/read.user.action"
import { UserModel, UserType } from "../userModel/user.model"
import { CreateUserType } from "../user.types"
import { updateUserAction } from "../userActions/update.user.action"
import { disableUserAction } from "../userActions/delete.user.action"
async function readUsers(): Promise<UserType | null > {
  const users = await UserModel.findOne({ isActive: true }) 
  return users
}

async function createUser(userData: CreateUserType): Promise<UserType> {
  const createdUser = await createUserAction(userData)
  return createdUser
}

async function updateUser(userId: string, updateData: Partial<UserType>): Promise<UserType | null> {
  return await updateUserAction(userId, updateData)
}


async function disableUser(userId: string): Promise<UserType | null> {
  return await disableUserAction(userId)
}

export { readUsers, createUser, updateUser, disableUser }
