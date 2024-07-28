"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyLogin = exports.UserConfig = exports.User = void 0;
class User {
    constructor(id, name, email, password, height, weight, sex, nickname, description, img, gym) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.height = height;
        this.weight = weight;
        this.sex = sex;
        this.nickname = nickname;
        this.description = description;
        this.img = img;
        this.gym = gym;
    }
}
exports.User = User;
class UserConfig {
    constructor(userID, canName, canDescription, canAge, canWeight, canHeight, canSex, canEmail, canProfile, canGym, isPremium) {
        this.userID = userID;
        this.canName = canName;
        this.canDescription = canDescription;
        this.canAge = canAge;
        this.canWeight = canWeight;
        this.canHeight = canHeight;
        this.canSex = canSex;
        this.canEmail = canEmail;
        this.canProfile = canProfile;
        this.canGym = canGym;
        this.isPremium = isPremium;
    }
}
exports.UserConfig = UserConfig;
class VerifyLogin {
    constructor(id, name, email, token) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.token = token;
    }
}
exports.VerifyLogin = VerifyLogin;
