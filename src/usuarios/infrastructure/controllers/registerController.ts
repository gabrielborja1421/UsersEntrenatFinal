import { Request, Response } from "express"
import { RegisterUseCase } from "../../application/registerUseCase";

export class RegisterController {
  constructor(readonly registerUseCase: RegisterUseCase) {}

  async run(req: Request, res: Response) {
    try {
      // Verifica que req.body no esté vacío y contenga las propiedades necesarias
      if (!req.body || !req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).send({
          status: "error",
          message: "Datos incompletos",
        });
      }
  
      const {
        name,
        email,
        nickname,
        password,
        height,
        weight,
        sex,
      } = req.body;
  
      // Continua con el registro
      const registerUser = await this.registerUseCase.run(
        name,
        email,
        nickname,
        password,
        height,
        weight,
        sex,
      );
  
      if (registerUser) {
        return res.status(201).send({
          status: "success",
          data: {
            id: registerUser.id,
            name: registerUser.name,
            email: registerUser.email,
          },
        });
      } else {
        return res.status(400).send({
          status: "error",
          message: "Ya está registrado este correo.",
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
