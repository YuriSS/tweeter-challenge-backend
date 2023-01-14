"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserUsecase = void 0;
const user_1 = require("@user/domain/entity/user");
class CreateUserUsecase {
    constructor(userRepository, validator, makeId) {
        this.userRepository = userRepository;
        this.validator = validator;
        this.makeId = makeId;
    }
    async execute(fields) {
        const user = new user_1.UserEntity({
            username: fields.username,
            password: fields.password,
            createdAt: fields.createdAt,
            updatedAt: fields.updatedAt,
        }, this.validator, this.makeId);
        await this.userRepository.create(user);
        return {
            id: user.id.value.id,
            username: user.username,
            password: user.password,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }
}
exports.CreateUserUsecase = CreateUserUsecase;
