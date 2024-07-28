export class User {
    constructor(
        public id: number,
        public name: string,
        public email: string,
        public password: string,
        public height: number,
        public weight: number,
        public sex: string,   
        public nickname: string,
        public description: string,
        public img: string,
        public gym: string
     ){}
  }
  export class UserConfig {
   constructor(
         public userID: number,
         public canName: boolean,
         public canDescription: boolean,
         public canAge: boolean,
         public canWeight: boolean,
         public canHeight: boolean,
         public canSex: boolean,
         public canEmail: boolean,
         public canProfile: boolean,
         public canGym: boolean,
         public isPremium: boolean,
   ){}
  }

  export class VerifyLogin{
    constructor(
        public id: number,
        public name: string,
        public email: string,
        public token: string,
     ){}
    
  } 
  