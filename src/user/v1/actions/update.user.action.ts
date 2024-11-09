import { UserModel } from "../models/user.model"
import { UserType } from "../models/user.model"

export const updateUserAction = async (userId: string, updateData: Partial<UserType>): Promise<UserType | null> => {
  // Excluir los campos de permisos para evitar que se actualicen
  const { canCreate, canDeleteUsers, canEditUsers, canDeleteBooks, canEditBooks, ...filteredData } = updateData

  const updatedUser = await UserModel.findByIdAndUpdate(userId, filteredData, { new: true })
  return updatedUser
}
