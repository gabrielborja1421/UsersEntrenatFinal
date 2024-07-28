import { Request, Response } from "express";
import { RegisterUserConfigUseCase } from "../../application/registerUserConfigUseCase";

export class RegisterUserConfigController {
  constructor(readonly registerUseCase: RegisterUserConfigUseCase) {}

  async run(req: Request, res: Response) {
    try {
      const {
        userID,
        canName = false,
        canDescription = false,
        canAge = false,
        canWeight = false,
        canHeight = false,
        canSex = false,
        canEmail = false,
        canProfile = false,
        canGym = false,
        isPremium = false
      } = req.body;

      // Continua con el registro
      const registerUser = await this.registerUseCase.run(
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

      if (registerUser) {
        return res.status(201).send({
          status: "success",
          registerUser
        });
      } else {
        return res.status(400).send({
          status: "error",
          message: "Error.",
        });
      }
    } catch (err) {
      console.error("Error al registrar usuario: --- ", err);
      return res.status(500).send({
        status: "error",
        message: "Error interno del servidor",
      });
    }
  }
}
