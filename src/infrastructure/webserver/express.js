"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = exports.app = void 0;
const profile_repository_model_1 = require("@profile/infrastructure/repository/sequelize/profile.repository.model");
const user_repository_model_1 = require("@user/infrastructure/repository/user.repository.model");
const express_1 = __importDefault(require("express"));
const sequelize_typescript_1 = require("sequelize-typescript");
const user_route_1 = require("@infrastructure/webserver/routes/user.route");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use("user", user_route_1.userRoute);
exports.sequelize = new sequelize_typescript_1.Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false
});
exports.sequelize.addModels([user_repository_model_1.UserSequelizeModel, profile_repository_model_1.ProfileSequelizeModel]);
exports.sequelize.sync();
