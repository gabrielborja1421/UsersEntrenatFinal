import express from "express";
import { getUserConfigByIdController, registerController, registerUserConfigController, setAsInactiveController, updateUserConfigController, updateUserController } from "./controllers/dependencies";
import { listAllUserController } from "./controllers/dependencies";
import { getUserByIdController } from "./controllers/dependencies";
import { deleteUserByIdController } from "./controllers/dependencies";
import { loginController } from "./controllers/dependencies";
import { validateToken } from "./helpers/verifyToken";
import { GetUserConfigByIdController } from "./controllers/ListUserConfigurationController";

export const userRouter = express.Router();

// Ruta para registrar un usuario
userRouter.post("/register", registerController.run.bind(registerController));

userRouter.post('/login',loginController.run.bind(loginController))

userRouter.put('/setinactive', validateToken,setAsInactiveController.run.bind(setAsInactiveController))

// Ruta para obtener todos los usuarios
userRouter.get("/list", listAllUserController.run.bind(listAllUserController));

// Ruta para obtener un usuario por su ID
userRouter.get("/:id", getUserByIdController.run.bind(getUserByIdController)); 

// Ruta para eliminar un usuario por su ID
userRouter.delete("/:id", validateToken,deleteUserByIdController.run.bind(deleteUserByIdController));

userRouter.put('/config', validateToken, updateUserConfigController.run.bind(updateUserConfigController))

userRouter.post('/config/create', validateToken, registerUserConfigController.run.bind(registerUserConfigController))

userRouter.get('/config/:id', validateToken, getUserConfigByIdController.run.bind(getUserConfigByIdController))

userRouter.put('/update', validateToken, updateUserController.run.bind(updateUserController))