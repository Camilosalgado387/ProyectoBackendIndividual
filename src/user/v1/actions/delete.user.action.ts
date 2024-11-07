//delete user action function, its not a literall delete is a soft delete
import { UserModel } from "../models/user.model";
import { UserType } from "../models/user.model";

export const disableUserAction = async (userId: string): Promise<UserType | null> => {
  return await UserModel.findByIdAndUpdate(userId, { isActive: false }, { new: true });
};
