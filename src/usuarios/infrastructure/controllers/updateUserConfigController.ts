import { Request, Response } from "express";
import { UpdateUserConfigUC } from "../../application/updateUserConfigUC";
import { UserConfig } from "../../domain/user";

export class UpdateUserConfigController {
  constructor(readonly updateUserConfig: UpdateUserConfigUC) {}

  async run(req: Request, res: Response) {
    try {
      const { id, ...configParams } = req.body;

      let updateUserConfig = await this.updateUserConfig.run(id, configParams as Partial<UserConfig>);

      if (updateUserConfig) {
        return res.status(200).send({
          status: "success",
          data: {
            message: `User config with id ${id} updated successfully.`,
          },
        });
      } else {
        return res.status(404).send({
          status: "error",
          message: "No user found with that id.",
        });
      }
    } catch (error) {
      return res.status(500).send({
        status: "error",
        message: "An error occurred while trying to update user config.",
      });
    }
  }
}
