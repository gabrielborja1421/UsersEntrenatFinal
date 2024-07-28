import { Request, Response } from "express";
import { User } from "../../domain/user";
import { UpdateUserUC } from "../../application/updateUserUC";

export class UpdateUserController {
  constructor(readonly updateUser: UpdateUserUC) {}

  async run(req: Request, res: Response) {
    try {
      const { id, ...configParams } = req.body;
      console.log(id, configParams);
      let updateUserConfig = await this.updateUser.run(id, configParams as Partial<User>);
      console.log("controlador");
      
      if (updateUserConfig) {
        return res.status(200).send({
          status: "success",
          data: {
            message: `User config with id ${id} updated successfully.`,
            user: updateUserConfig,
          },
        });
      } else {
        return res.status(404).send({
          status: "error",
          message: "No user found with that id----.",
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
