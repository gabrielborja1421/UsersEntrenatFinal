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
exports.RegisterUserConfigController = void 0;
class RegisterUserConfigController {
    constructor(registerUseCase) {
        this.registerUseCase = registerUseCase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userID, canName = false, canDescription = false, canAge = false, canWeight = false, canHeight = false, canSex = false, canEmail = false, canProfile = false, canGym = false, isPremium = false } = req.body;
                // Continua con el registro
                const registerUser = yield this.registerUseCase.run(userID, canName, canDescription, canAge, canWeight, canHeight, canSex, canEmail, canProfile, canGym, isPremium);
                if (registerUser) {
                    return res.status(201).send({
                        status: "success",
                        registerUser
                    });
                }
                else {
                    return res.status(400).send({
                        status: "error",
                        message: "Error.",
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
exports.RegisterUserConfigController = RegisterUserConfigController;
