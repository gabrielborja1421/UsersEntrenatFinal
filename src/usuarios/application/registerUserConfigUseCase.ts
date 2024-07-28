import { User, UserConfig } from "../domain/user";
import { IUserRepository } from "../domain/userRepository";
import { ValidatorRegisterUser } from "../domain/validation/user";
import { validate } from "class-validator";


export class RegisterUserConfigUseCase {
  constructor(readonly userRepository: IUserRepository) {}

  async run(
    userID: number,
    canName: boolean,
    canDescription: boolean,
    canAge: boolean,
    canWeight: boolean,
    canHeight: boolean,
    canSex: boolean,
    canEmail: boolean,
    canProfile: boolean,
    canGym: boolean,
    isPremium: boolean
  ): Promise<UserConfig | null> {
    try {
      const createNewUserConfig = await this.userRepository.CreateUserConfig(
        userID,
        canName,
        canDescription,
        canAge,
        canWeight,
        canHeight,
        canSex,
        canEmail,
        canProfile,
        canGym,
        isPremium
      );

      return createNewUserConfig;
    } catch (error) {
      console.error("Error al registrar configuración de usuario:", error);
      return null;
    }
  }
}
