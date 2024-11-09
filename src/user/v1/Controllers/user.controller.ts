import createUserAction from "../actions/create.user.action"
import { loginUser } from "../actions/read.user.action"
import { UserModel, UserType } from "../models/user.model"
import { CreateUserType } from "../user.types"
import { updateUserAction } from "../actions/update.user.action"
import { disableUserAction } from "../actions/delete.user.action"
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
