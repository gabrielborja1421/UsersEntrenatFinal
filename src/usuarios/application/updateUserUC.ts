import { IUserRepository } from "../domain/userRepository";
import { User } from "../domain/user";

export class UpdateUserUC {
  constructor(readonly userRepository: IUserRepository) {}

  async run(id: number, configParams: Partial<User>): Promise<User | any> {
    try {
      const updatedUser = await this.userRepository.updateUser(id, configParams);
      console.log("caso de uso");
      console.log(id,  configParams);
      console.log('caso de uso datos:' + updatedUser);
      return updatedUser;
    } catch (error) {
      console.error('Error updating user config:', error);
      return null;
    }
  }
}
