"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const dependencies_1 = require("./controllers/dependencies");
const dependencies_2 = require("./controllers/dependencies");
const dependencies_3 = require("./controllers/dependencies");
const dependencies_4 = require("./controllers/dependencies");
const dependencies_5 = require("./controllers/dependencies");
const verifyToken_1 = require("./helpers/verifyToken");
exports.userRouter = express_1.default.Router();
// Ruta para registrar un usuario
exports.userRouter.post("/register", dependencies_1.registerController.run.bind(dependencies_1.registerController));
exports.userRouter.post('/login', dependencies_5.loginController.run.bind(dependencies_5.loginController));
exports.userRouter.put('/setinactive', verifyToken_1.validateToken, dependencies_1.setAsInactiveController.run.bind(dependencies_1.setAsInactiveController));
// Ruta para obtener todos los usuarios
exports.userRouter.get("/list", dependencies_2.listAllUserController.run.bind(dependencies_2.listAllUserController));
// Ruta para obtener un usuario por su ID
exports.userRouter.get("/:id", dependencies_3.getUserByIdController.run.bind(dependencies_3.getUserByIdController));
// Ruta para eliminar un usuario por su ID
exports.userRouter.delete("/:id", verifyToken_1.validateToken, dependencies_4.deleteUserByIdController.run.bind(dependencies_4.deleteUserByIdController));
exports.userRouter.put('/config', verifyToken_1.validateToken, dependencies_1.updateUserConfigController.run.bind(dependencies_1.updateUserConfigController));
exports.userRouter.post('/config/create', verifyToken_1.validateToken, dependencies_1.registerUserConfigController.run.bind(dependencies_1.registerUserConfigController));
exports.userRouter.get('/config/:id', verifyToken_1.validateToken, dependencies_1.getUserConfigByIdController.run.bind(dependencies_1.getUserConfigByIdController));
exports.userRouter.put('/update', verifyToken_1.validateToken, dependencies_1.updateUserController.run.bind(dependencies_1.updateUserController));
