import { User } from "../domain/user";
import { IUserRepository } from "../domain/userRepository";
import { ValidatorRegisterUser } from "../domain/validation/user";
import { validate } from "class-validator";


export class RegisterUseCase {
  constructor(readonly userRepository: IUserRepository) {}

  async run(
    name: string,
    email: string,
    nickname: string,
    password: string, // Debe almacenarse de forma segura (hash + salt)
    height: number,
    weight: number,
    sex: string
  ): Promise<User | null> {
    
    let data = new ValidatorRegisterUser(name, email, height, weight,sex, password);
    const validation = await validate(data)
    console.log(validation)
    if (validation.length > 0) {
        throw new Error(JSON.stringify(validation));
    }
    try {
      const createNewUser = await this.userRepository.registerUser(
        name,
        email,
        password,
        height,
        weight,
        sex,
        nickname,
      );


      return createNewUser;
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      return null; 
    }
  }
}
