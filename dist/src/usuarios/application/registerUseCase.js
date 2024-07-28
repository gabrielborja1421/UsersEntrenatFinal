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
exports.RegisterUseCase = void 0;
const user_1 = require("../domain/validation/user");
const class_validator_1 = require("class-validator");
class RegisterUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    run(name, email, nickname, password, // Debe almacenarse de forma segura (hash + salt)
    height, weight, sex) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = new user_1.ValidatorRegisterUser(name, email, height, weight, sex, password);
            const validation = yield (0, class_validator_1.validate)(data);
            console.log(validation);
            if (validation.length > 0) {
                throw new Error(JSON.stringify(validation));
            }
            try {
                const createNewUser = yield this.userRepository.registerUser(name, email, password, height, weight, sex, nickname);
                return createNewUser;
            }
            catch (error) {
                console.error("Error al registrar usuario:", error);
                return null;
            }
        });
    }
}
exports.RegisterUseCase = RegisterUseCase;
