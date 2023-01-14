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
exports.ProfileSequelizeModel = void 0;
const user_repository_model_1 = require("@user/infrastructure/repository/user.repository.model");
const sequelize_typescript_1 = require("sequelize-typescript");
let ProfileSequelizeModel = class ProfileSequelizeModel extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], ProfileSequelizeModel.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_repository_model_1.UserSequelizeModel),
    (0, sequelize_typescript_1.Column)({ allowNull: false }),
    __metadata("design:type", String)
], ProfileSequelizeModel.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: false }),
    __metadata("design:type", String)
], ProfileSequelizeModel.prototype, "firstName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: false }),
    __metadata("design:type", String)
], ProfileSequelizeModel.prototype, "lastName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: false }),
    __metadata("design:type", String)
], ProfileSequelizeModel.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: false }),
    __metadata("design:type", String)
], ProfileSequelizeModel.prototype, "biography", void 0);
ProfileSequelizeModel = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "profile",
    })
], ProfileSequelizeModel);
exports.ProfileSequelizeModel = ProfileSequelizeModel;
