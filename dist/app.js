"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const signale_1 = require("signale");
const userRoutes_1 = require("./src/usuarios/infrastructure/userRoutes");
const body_parser_1 = __importDefault(require("body-parser"));
const consumidor_1 = require("./src/consumidor/consumidor");
const app = (0, express_1.default)();
const signale = new signale_1.Signale();
app.use(express_1.default.json());
app.use(body_parser_1.default.json()); // Si usas body-parser
// Rutas relacionadas con usuarios
app.use(userRoutes_1.userRouter);
// Iniciar el consumidor
(0, consumidor_1.startConsumer)();
const PORT = 8081;
const HOST = '0.0.0.0'; // Escuchar en todas las interfaces de red
app.listen(PORT, HOST, () => {
    signale.success(`Server online on port ${PORT}`);
});
