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
exports.UserMysqlRepository = void 0;
const conecction_1 = require("../../database/conecction");
const user_1 = require("../domain/user");
const hash_1 = require("./helpers/hash");
const token_1 = require("./helpers/token");
class UserMysqlRepository {
    registerUser(name, email, password, height, weight, sex, nickname) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const checkEmailSql = `
                SELECT COUNT(*) as emailCount
                FROM usuario
                WHERE correo = ?;
                `;
                const [emailResults] = yield (0, conecction_1.query)(checkEmailSql, [email]);
                if (emailResults[0].emailCount > 0) {
                    throw new Error("El correo electrónico ya está registrado en la base de datos.");
                }
                const hashPassword = yield (0, hash_1.encrypt)(password);
                const sql = "INSERT INTO usuario (nombre, correo, contraseña, altura, peso, gender, nickname) VALUES (?, ?, ?, ?, ?, ?, ?)";
                const params = [name, email, hashPassword, height, weight, sex, nickname];
                const [result] = yield (0, conecction_1.query)(sql, params);
                console.log("result: ", result); // Log adicional
                if (result.insertId) {
                    // Crear una instancia de User con el ID generado
                    const user = new user_1.User(result.insertId, name, email, hashPassword, height, weight, sex, nickname, '', '', '');
                    return user;
                }
                else {
                    console.error("No se pudo insertar el usuario en la base de datos.");
                    return null;
                }
            }
            catch (error) {
                console.error("Error al registrar el usuario:", error);
                return null;
            }
        });
    }
    loginUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userSql = "SELECT UserID AS userid, nombre AS username, correo AS email, contraseña AS password FROM usuario WHERE correo = ? LIMIT 1";
                const [userRows] = yield (0, conecction_1.query)(userSql, [email]);
                if (!Array.isArray(userRows) || userRows.length === 0) {
                    return null; // El usuario no existe
                }
                const userRow = userRows[0];
                const isPasswordMatch = yield (0, hash_1.compare)(password, userRow.password);
                if (!isPasswordMatch) {
                    return null; // Contraseña incorrecta
                }
                // Generate a JWT token using your tokenSigIn function
                const token = (0, token_1.tokenSigIn)(userRow.username, userRow.email);
                const user = new user_1.VerifyLogin(userRow.userid, userRow.username, userRow.email, token);
                return user;
            }
            catch (error) {
                console.error("Error en loginUser:", error);
                return null;
            }
        });
    }
    listAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "SELECT * FROM usuario";
                const [rows] = yield (0, conecction_1.query)(sql);
                if (!Array.isArray(rows)) {
                    throw new Error('Rows is not an array');
                }
                console.log("rows: ", rows); // Log adicional
                return rows;
            }
            catch (error) {
                console.error("Error al listar usuarios:", error);
                return null;
            }
        });
    }
    deleteUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'DELETE FROM usuario WHERE userid = ?';
                const result = yield (0, conecction_1.query)(sql, [id]);
                if (!result || result.affectedRows === 0) {
                    return 'No se encontró ningún usuario con el ID proporcionado.';
                }
                return 'Usuario eliminado exitosamente.';
            }
            catch (error) {
                console.error('Error al eliminar el usuario:', error);
                throw error; // Puedes manejar el error de la manera que prefieras o simplemente lanzarlo para que se maneje en un nivel superior.
            }
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "SELECT * FROM usuario WHERE userid = ? LIMIT 1";
                const [rows] = yield (0, conecction_1.query)(sql, [id]);
                // Verificar si no se encontraron resultados o si la respuesta es vacía
                if (!Array.isArray(rows) || rows.length === 0) {
                    return null;
                }
                const row = rows[0];
                const userData = new user_1.User(row.userid, row.nickname, row.nombre, row.correo, row.contraseña, row.altura, row.peso, row.gender, row.nickname, row.descripcion, row.img);
                return row;
            }
            catch (error) {
                console.error("Error en getUserById:", error);
                return null;
            }
        });
    }
    listAllInactiveUser() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "SELECT * FROM usuario WHERE cuentaactiva = false"; // SQL modificado para filtrar por status
                const [rows] = yield (0, conecction_1.query)(sql); // Esto probablemente devuelve un tipo de dato más complejo
                if (!Array.isArray(rows)) {
                    throw new Error('Error'); // Puedes manejar este caso según tus necesidades
                }
                //const users: User[] = rows.map(row => new User(row.id, row.name, row.phone, row.email, row.nickname ,row.password, row.active, row.canlent));
                return null;
            }
            catch (error) {
                console.error("Error en listAllInactiveUser:", error);
                return null; // Retorna null en caso de error o podrías optar por retornar un array vacío dependiendo de tu lógica de negocio
            }
        });
    }
    setAsInactive(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'UPDATE usuario SET cuentaactiva = false WHERE userid = ?';
                const [resultSet] = yield (0, conecction_1.query)(sql, [id || null]);
                if (!resultSet || resultSet.affectedRows === 0) {
                    return null;
                }
                return id;
            }
            catch (error) {
                console.error('Error al activar el usuario:', error);
                throw new Error('No se pudo activar el usuario.'); // O maneja el error de la manera que prefieras.
            }
        });
    }
    updateUser(id, configParams) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filteredConfigParams = Object.fromEntries(Object.entries(configParams).filter(([_, value]) => value !== undefined));
                const fields = Object.keys(filteredConfigParams)
                    .map(key => `${key} = ?`)
                    .join(', ');
                if (fields.length === 0) {
                    throw new Error("No fields to update");
                }
                // Corrección: Eliminar 'id' de los valores
                const values = Object.values(filteredConfigParams);
                const sql = `UPDATE usuario SET ${fields} WHERE UserID = ?`;
                // Corrección: Pasar solo 'id' al final
                const [resultSet] = yield (0, conecction_1.query)(sql, [...values, id]);
                if (!resultSet || resultSet.affectedRows === 0) {
                    return null;
                }
                // Construir el objeto User con los valores actualizados
                const updatedUser = new user_1.User(id, configParams.name || '', configParams.email || '', configParams.password || '', configParams.height || 0, configParams.weight || 0, configParams.sex || '', configParams.nickname || '', configParams.description || '', configParams.gym || '', configParams.img || '');
                console.log("updatedUser:", updatedUser);
                return updatedUser;
            }
            catch (error) {
                console.error('Error updating user config:', error);
                throw new Error('Failed to update user config.');
            }
        });
    }
    // implementa el metodo updateUserConfig para podder actualizar la configuracion de un usuario
    updateUserConfig(id, configParams) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fields = Object.keys(configParams).map(key => `${key} = ?`).join(', ');
                const values = Object.values(configParams);
                const sql = `UPDATE UserConfig SET ${fields} WHERE userID = ?`;
                const [resultSet] = yield (0, conecction_1.query)(sql, [...values, id]);
                if (!resultSet || resultSet.affectedRows === 0) {
                    return null;
                }
                // Reconstruir UserConfig desde configParams y el id
                const updatedUserConfig = new user_1.UserConfig(id, (_a = configParams.canName) !== null && _a !== void 0 ? _a : false, (_b = configParams.canDescription) !== null && _b !== void 0 ? _b : false, (_c = configParams.canAge) !== null && _c !== void 0 ? _c : false, (_d = configParams.canWeight) !== null && _d !== void 0 ? _d : false, (_e = configParams.canHeight) !== null && _e !== void 0 ? _e : false, (_f = configParams.canSex) !== null && _f !== void 0 ? _f : false, (_g = configParams.canEmail) !== null && _g !== void 0 ? _g : false, (_h = configParams.canProfile) !== null && _h !== void 0 ? _h : false, (_j = configParams.canGym) !== null && _j !== void 0 ? _j : false, (_k = configParams.isPremium) !== null && _k !== void 0 ? _k : false);
                return updatedUserConfig;
            }
            catch (error) {
                console.error('Error updating user config:', error);
                throw new Error('Failed to update user config.');
            }
        });
    }
    CreateUserConfig(userID, canName, canDescription, canAge, canWeight, canHeight, canSex, canEmail, canProfile, canGym, isPremium) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'INSERT INTO UserConfig (userID, canName, canDescription, canAge, canWeight, canHeight, canSex, canEmail, canProfile, canGym, isPremium) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
                const params = [
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
                ];
                // Verificación de parámetros no definidos
                for (const param of params) {
                    if (param === undefined) {
                        throw new Error('Uno o más parámetros no están definidos.');
                    }
                }
                const [resultSet] = yield (0, conecction_1.query)(sql, params);
                if (!resultSet || resultSet.affectedRows === 0) {
                    return null;
                }
                return new user_1.UserConfig(userID, canName, canDescription, canAge, canWeight, canHeight, canSex, canEmail, canProfile, canGym, isPremium);
            }
            catch (error) {
                console.error('Error al crear la configuración del usuario:', error);
                throw new Error('No se pudo crear la configuración del usuario.'); // O maneja el error de la manera que prefieras.
            }
        });
    }
    getUserConfigById(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM UserConfig WHERE userID = ?';
                const [rows] = yield (0, conecction_1.query)(sql, [userID]);
                if (!Array.isArray(rows) || rows.length === 0) {
                    return null;
                }
                const row = rows[0];
                console.log("row: ", row); // Log adicional
                return new user_1.UserConfig(row.userID, row.canName, row.canDescription, row.canAge, row.canWeight, row.canHeight, row.canSex, row.canEmail, row.canProfile, row.canGym, row.isPremium);
            }
            catch (error) {
                console.error('Error al obtener la configuración del usuario:', error);
                throw new Error('No se pudo obtener la configuración del usuario.'); // O maneja el error de la manera que prefieras.
            }
        });
    }
}
exports.UserMysqlRepository = UserMysqlRepository;
