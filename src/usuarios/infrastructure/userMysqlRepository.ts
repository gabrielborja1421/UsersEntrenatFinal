import { query } from "../../database/conecction";
import { User, UserConfig,  VerifyLogin } from "../domain/user";
import { IUserRepository } from "../domain/userRepository";
import { compare, encrypt } from './helpers/hash';
import { tokenSigIn } from "./helpers/token";





export class UserMysqlRepository implements IUserRepository {
  
  async registerUser(
    name: string, 
    email: string, 
    password: string, 
    height: number, 
    weight: number, 
    sex: string, 
        nickname: string, 

  ): Promise<User | null> {
    try {

      const checkEmailSql = `
                SELECT COUNT(*) as emailCount
                FROM usuario
                WHERE correo = ?;
                `;

            const [emailResults]: any = await query(checkEmailSql, [email]);
            if (emailResults[0].emailCount > 0) {
                throw new Error("El correo electrónico ya está registrado en la base de datos.");
            }
      
      const hashPassword = await encrypt(password);
      const sql = "INSERT INTO usuario (nombre, correo, contraseña, altura, peso, gender, nickname) VALUES (?, ?, ?, ?, ?, ?, ?)";
      const params: any[] = [name, email, hashPassword, height, weight, sex, nickname];
      const [result]: any = await query(sql, params);
      console.log("result: ", result); // Log adicional
      if (result.insertId) {
        // Crear una instancia de User con el ID generado
        const user = new User(result.insertId, name, email,hashPassword, height, weight, sex, nickname, '', '', '');
        return user;
      } else {
        console.error("No se pudo insertar el usuario en la base de datos.");
        return null;
      }
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      return null;
    }
  }

  async loginUser(email: string, password: string): Promise<VerifyLogin | null> {
    try {
        const userSql = "SELECT UserID AS userid, nombre AS username, correo AS email, contraseña AS password FROM usuario WHERE correo = ? LIMIT 1";
        const [userRows]: any = await query(userSql, [email]);

        if (!Array.isArray(userRows) || userRows.length === 0) {
            return null; // El usuario no existe
        }

        const userRow = userRows[0];

        const isPasswordMatch = await compare(password, userRow.password);

        if (!isPasswordMatch) {
            return null; // Contraseña incorrecta
        }

        // Generate a JWT token using your tokenSigIn function
        const token: string = tokenSigIn(userRow.username, userRow.email);

        const user = new VerifyLogin(
            userRow.userid,
            userRow.username,
            userRow.email,
            token
        );

        return user;
    } catch (error) {
        console.error("Error en loginUser:", error);
        return null;
    }
}




async listAllUsers(): Promise<User[] | any> {
  try {
    const sql = "SELECT * FROM usuario";
    const [rows]: any = await query(sql);

    if (!Array.isArray(rows)) {
      throw new Error('Rows is not an array');
    }

    console.log("rows: ", rows); // Log adicional

    
    return rows;
  } catch (error) {
    console.error("Error al listar usuarios:", error);
    return null;
  }
}

  
  async deleteUserById(id: number): Promise<string | null> {
    try {
        const sql = 'DELETE FROM usuario WHERE userid = ?';
        const result: any = await query(sql, [id]);

        if (!result || result.affectedRows === 0) {
            return 'No se encontró ningún usuario con el ID proporcionado.';
        }

        return 'Usuario eliminado exitosamente.';
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        throw error; // Puedes manejar el error de la manera que prefieras o simplemente lanzarlo para que se maneje en un nivel superior.
    }
}

async getUserById(id: number): Promise<User | null> {
  try {
    const sql = "SELECT * FROM usuario WHERE userid = ? LIMIT 1";
    const [rows]: any = await query(sql, [id]);

    // Verificar si no se encontraron resultados o si la respuesta es vacía
    if (!Array.isArray(rows) || rows.length === 0) {
      return null;
    }

    const row = rows[0];
    const userData = new User(
      row.userid,
      row.nickname,
      row.nombre,
      row.correo,
      row.contraseña,
      row.altura,
      row.peso,
      row.gender,
      row.nickname,
      row.descripcion,
      row.img
    );

    
    return row;
  } catch (error) {
    console.error("Error en getUserById:", error);
    return null;
  }
}
async listAllInactiveUser(): Promise<User[] | null> {
  try {
      const sql = "SELECT * FROM usuario WHERE cuentaactiva = false"; // SQL modificado para filtrar por status
      const [rows]: any = await query(sql); // Esto probablemente devuelve un tipo de dato más complejo

      if (!Array.isArray(rows)) {
          throw new Error('Error'); // Puedes manejar este caso según tus necesidades
      }

      //const users: User[] = rows.map(row => new User(row.id, row.name, row.phone, row.email, row.nickname ,row.password, row.active, row.canlent));
      return null;
  } catch (error) {
      console.error("Error en listAllInactiveUser:", error);
      return null; // Retorna null en caso de error o podrías optar por retornar un array vacío dependiendo de tu lógica de negocio
  }
}



async setAsInactive(id: number | null): Promise<number | null> {
  try {
      const sql = 'UPDATE usuario SET cuentaactiva = false WHERE userid = ?';
      const [resultSet]: any = await query(sql, [id || null]);

      if (!resultSet || resultSet.affectedRows === 0) {
          return null;
      }
      return id;
  } catch (error) {
      console.error('Error al activar el usuario:', error);
      throw new Error('No se pudo activar el usuario.'); // O maneja el error de la manera que prefieras.
  }
}

async updateUser(id: number, configParams: Partial<User>): Promise<User | null> {
  try {
    const filteredConfigParams = Object.fromEntries(
      Object.entries(configParams).filter(([_, value]) => value !== undefined)
    );

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
    const [resultSet]: any = await query(sql, [...values, id]);
    

    if (!resultSet || resultSet.affectedRows === 0) {
      return null;
    }

    // Construir el objeto User con los valores actualizados
    const updatedUser = new User(
      id,
      configParams.name || '',
      configParams.email || '',
      configParams.password || '',
      configParams.height || 0,
      configParams.weight || 0,
      configParams.sex || '',
      configParams.nickname || '',
      configParams.description || '',
      configParams.gym || '',
      configParams.img || '',
    );

    console.log("updatedUser:", updatedUser);
    return updatedUser;
  } catch (error) {
    console.error('Error updating user config:', error);
    throw new Error('Failed to update user config.');
  }
}



// implementa el metodo updateUserConfig para podder actualizar la configuracion de un usuario

async updateUserConfig(id: number, configParams: Partial<UserConfig>): Promise<UserConfig | null> {
  try {
    const fields = Object.keys(configParams).map(key => `${key} = ?`).join(', ');
    const values = Object.values(configParams);
    const sql = `UPDATE UserConfig SET ${fields} WHERE userID = ?`;
    const [resultSet]: any = await query(sql, [...values, id]);

    if (!resultSet || resultSet.affectedRows === 0) {
      return null;
    }

    // Reconstruir UserConfig desde configParams y el id
    const updatedUserConfig = new UserConfig(
      id,
      configParams.canName ?? false,
      configParams.canDescription ?? false,
      configParams.canAge ?? false,
      configParams.canWeight ?? false,
      configParams.canHeight ?? false,
      configParams.canSex ?? false,
      configParams.canEmail ?? false,
      configParams.canProfile ?? false,
      configParams.canGym ?? false,
      configParams.isPremium ?? false,
    );

    return updatedUserConfig;
  } catch (error) {
    console.error('Error updating user config:', error);
    throw new Error('Failed to update user config.');
  }
}

async CreateUserConfig(
    userID: number,
    canName: boolean,
    canDescription: boolean,
    canAge: boolean,
    canWeight: boolean,
    canHeight: boolean,
    canSex: boolean,
    canEmail: boolean,
    canProfile: boolean,
    canGym: boolean,
    isPremium: boolean
  ): Promise<UserConfig | any> {
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

      const [resultSet]: any = await query(sql, params);

      if (!resultSet || resultSet.affectedRows === 0) {
        return null;
      }
      return new UserConfig(userID, canName, canDescription, canAge, canWeight, canHeight, canSex, canEmail, canProfile, canGym, isPremium);
    } catch (error) {
      console.error('Error al crear la configuración del usuario:', error);
      throw new Error('No se pudo crear la configuración del usuario.'); // O maneja el error de la manera que prefieras.
    }
  }

  async getUserConfigById(userID: number): Promise<UserConfig | any> {
      try {
          const sql = 'SELECT * FROM UserConfig WHERE userID = ?';
          const [rows]: any = await query(sql, [userID]);

          if (!Array.isArray(rows) || rows.length === 0) {
              return null;
          }

          const row = rows[0];
          console.log("row: ", row); // Log adicional
          return new UserConfig( row.userID, row.canName, row.canDescription, row.canAge, row.canWeight, row.canHeight, row.canSex, row.canEmail, row.canProfile, row.canGym, row.isPremium);
      } catch (error) {
          console.error('Error al obtener la configuración del usuario:', error);
          throw new Error('No se pudo obtener la configuración del usuario.'); // O maneja el error de la manera que prefieras.

      }
    }
  


}
