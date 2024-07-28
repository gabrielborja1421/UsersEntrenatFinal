import { User, UserConfig } from "../domain/user";
import { IUserRepository } from "../domain/userRepository";

export class GetUserConfigByIdUseCase {
    constructor(readonly userRepository: IUserRepository) {}
    
    async run(id: number): Promise<UserConfig | null> {
        try {
            // Intenta obtener el usuario por su ID
            const getUserById = await this.userRepository.getUserConfigById(id);

            if (getUserById === null) {
                // Si no se encontró ningún usuario, lanza una excepción personalizada
                throw new Error("El usuario no existe"); // Puedes personalizar el mensaje de error
            }

            return getUserById;
        } catch (error) {
            // Captura y registra el error
            console.error("Error en GetUserByIdUseCase:", error);
            // Lanza la excepción para que pueda ser manejada en capas superiores si es necesario
            throw error;
        }
    }
}
