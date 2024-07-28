import { UserConfig } from "../domain/user";
import { IUserRepository } from "../domain/userRepository";

export class UpdateUserConfigUC {
  constructor(readonly userRepository: IUserRepository) {}

  async run(id: number, configParams: Partial<UserConfig>): Promise<UserConfig | null> {
    try {
      const updatedUserConfig = await this.userRepository.updateUserConfig(id, configParams);
      return updatedUserConfig;
    } catch (error) {
      console.error('Error updating user config:', error);
      return null;
    }
  }
}

