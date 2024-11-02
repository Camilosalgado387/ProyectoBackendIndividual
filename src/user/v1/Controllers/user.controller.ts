import createUserAction from "../actions/create.user.action";
import readUserAction from "../actions/read.user.action";
import { UserType } from "../models/user.model";
import { CreateUserType } from "../user.types";

// DECLARE CONTROLLER FUNCTIONS
async function readUsers(): Promise<UserType[]> {
  const users = await readUserAction();

  return users;
}
async function createUser(userData: CreateUserType): Promise<UserType> {
  const createdUser = await createUserAction(userData);

  return createdUser;
}

// EXPORT CONTROLLER FUNCTIONS
export { readUsers, createUser };
