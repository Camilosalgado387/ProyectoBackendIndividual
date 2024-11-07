import { UserModel } from "../models/user.model";
import { UserType } from "../models/user.model";

export const updateUserAction = async (userId: string, updateData: Partial<UserType>): Promise<UserType | null> => {
  const updatedUser = await UserModel.findByIdAndUpdate(userId, updateData, { new: true });
  return updatedUser;
};
