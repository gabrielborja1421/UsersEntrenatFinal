import { User, UserConfig, VerifyLogin } from "./user";

export interface IUserRepository {
  registerUser(
    name: string,
    email: string,
    password: string, // Debe almacenarse de forma segura (hash + salt)
    height: number,
    weight: number,
    sex: string,
    nickname: string,
  ): Promise<User | any>;

  loginUser(
    email:string,
    password:string
):Promise<VerifyLogin | string | null>  //listo


  listAllUsers(): Promise<User[] | any>;

  deleteUserById(id: number): Promise<string | null>;

  getUserById(id: number): Promise<User | null>;



  setAsInactive(id: number): Promise<number | null>;

  updateUserConfig(id: number, configParams: Partial<UserConfig>): Promise<UserConfig | any>;
  
  updateUser(id: number, configParams: Partial<User>): Promise<User | any>;


  CreateUserConfig(
    UserID: number,
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
  ): Promise<UserConfig | any>;

  //listar configuracion por id
  getUserConfigById(id: number): Promise<UserConfig | null>;
 
}