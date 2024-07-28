"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatorId = exports.ValidatorupdatePassword = exports.ValidateLogin = exports.ValidatorRegisterUser = void 0;
const class_validator_1 = require("class-validator");
class ValidatorRegisterUser {
    constructor(name, email, height, weight, gender, password) {
        this.name = name;
        this.email = email;
        this.height = height;
        this.weight = weight;
        this.gender = gender;
        this.password = password;
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ValidatorRegisterUser.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], ValidatorRegisterUser.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], ValidatorRegisterUser.prototype, "height", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], ValidatorRegisterUser.prototype, "weight", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ValidatorRegisterUser.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ValidatorRegisterUser.prototype, "password", void 0);
exports.ValidatorRegisterUser = ValidatorRegisterUser;
class ValidateLogin {
    constructor(email, password) {
        this.email = email,
            this.password = password;
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], ValidateLogin.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ValidateLogin.prototype, "password", void 0);
exports.ValidateLogin = ValidateLogin;
class ValidatorupdatePassword {
    constructor(id, password) {
        this.id = id;
        this.password = password;
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], ValidatorupdatePassword.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ValidatorupdatePassword.prototype, "password", void 0);
exports.ValidatorupdatePassword = ValidatorupdatePassword;
class ValidatorId {
    constructor(id) {
        this.id = id;
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], ValidatorId.prototype, "id", void 0);
exports.ValidatorId = ValidatorId;
