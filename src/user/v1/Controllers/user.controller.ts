import createUserAction from "../actions/create.user.action";
import { loginUser } from "../actions/read.user.action";
import { UserModel, UserType } from "../models/user.model";
import { CreateUserType } from "../user.types";
import { updateUserAction } from "../actions/update.user.action";

async function readUsers(): Promise<UserType | null > {
  const users = await UserModel.findOne({ isActive: true }); 
  return users;
}

async function createUser(userData: CreateUserType): Promise<UserType> {
  const createdUser = await createUserAction(userData);
  return createdUser;
}

 async function updateUser(userId: string, updateData: Partial<UserType>): Promise<UserType | null> {
  return await updateUserAction(userId, updateData);
}


export { readUsers, createUser, updateUser };
