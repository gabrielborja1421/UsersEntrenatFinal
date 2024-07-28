"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterController = void 0;
class RegisterController {
    constructor(registerUseCase) {
        this.registerUseCase = registerUseCase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Verifica que req.body no esté vacío y contenga las propiedades necesarias
                if (!req.body || !req.body.name || !req.body.email || !req.body.password) {
                    return res.status(400).send({
                        status: "error",
                        message: "Datos incompletos",
                    });
                }
                const { name, email, nickname, password, height, weight, sex, } = req.body;
                // Continua con el registro
                const registerUser = yield this.registerUseCase.run(name, email, nickname, password, height, weight, sex);
                if (registerUser) {
                    return res.status(201).send({
                        status: "success",
                        data: {
                            id: registerUser.id,
                            name: registerUser.name,
                            email: registerUser.email,
                        },
                    });
                }
                else {
                    return res.status(400).send({
                        status: "error",
                        message: "Ya está registrado este correo.",
                    });
                }
            }
            catch (err) {
                console.error("Error al registrar usuario: --- ", err);
                return res.status(500).send({
                    status: "error",
                    message: "Error interno del servidor",
                });
            }
        });
    }
}
exports.RegisterController = RegisterController;
