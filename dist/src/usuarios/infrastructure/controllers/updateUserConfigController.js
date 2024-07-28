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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserConfigController = void 0;
class UpdateUserConfigController {
    constructor(updateUserConfig) {
        this.updateUserConfig = updateUserConfig;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _a = req.body, { id } = _a, configParams = __rest(_a, ["id"]);
                let updateUserConfig = yield this.updateUserConfig.run(id, configParams);
                if (updateUserConfig) {
                    return res.status(200).send({
                        status: "success",
                        data: {
                            message: `User config with id ${id} updated successfully.`,
                        },
                    });
                }
                else {
                    return res.status(404).send({
                        status: "error",
                        message: "No user found with that id.",
                    });
                }
            }
            catch (error) {
                return res.status(500).send({
                    status: "error",
                    message: "An error occurred while trying to update user config.",
                });
            }
        });
    }
}
exports.UpdateUserConfigController = UpdateUserConfigController;
