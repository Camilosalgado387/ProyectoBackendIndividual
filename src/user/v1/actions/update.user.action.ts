import { UserModel } from "../models/user.model";
import { UpdateUserType } from "../user.types";  // Asegúrate de tener los tipos de datos correctos
import { ObjectId } from "mongoose";

// Función para actualizar un usuario
const updateUserAction = async (userId: ObjectId, updateData: UpdateUserType) => {
  try {
    // Buscar al usuario en la base de datos por su ID
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Verificar si el usuario está activo
    if (!user.isActive) {
      throw new Error("User is not active");
    }

    // Actualizar el usuario con los datos proporcionados
    const updatedUser = await UserModel.findByIdAndUpdate(userId, updateData, { new: true });
    if (!updatedUser) {
      throw new Error("Failed to update user");
    }

    return updatedUser;
  } catch (error) {
    throw new Error("Error updating user");
  }
};

export default updateUserAction;
