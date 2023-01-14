"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileRepository = void 0;
const profile_repository_model_1 = require("@profile/infrastructure/repository/sequelize/profile.repository.model");
const not_found_error_1 = require("@shared/domain/errors/repository/not_found.error");
class ProfileRepository {
    constructor() {
        this.scope = 'Profile';
    }
    async create(entity) {
        await profile_repository_model_1.ProfileSequelizeModel.create({
            id: entity.id.value.id,
            userId: entity.userId.value.id,
            firstName: entity.name.firstName,
            lastName: entity.name.lastName,
            email: entity.email.value,
            biography: entity.biography,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        });
    }
    async update(entity) {
        await profile_repository_model_1.ProfileSequelizeModel.update({
            userId: entity.userId.value.id,
            firstName: entity.name.firstName,
            lastName: entity.name.lastName,
            email: entity.email.value,
            biography: entity.biography,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        }, {
            where: { id: entity.id.value.id }
        });
    }
    async find(id) {
        const value = id.value.id;
        const profileSequelizeModel = await profile_repository_model_1.ProfileSequelizeModel.findOne({ where: { id: value } });
        if (!profileSequelizeModel) {
            throw new not_found_error_1.NotFoundError({ field: 'id', value, scope: this.scope });
        }
        return this.createProfileModel(profileSequelizeModel);
    }
    findAll() {
        throw new Error("Not implemented yet");
    }
    createProfileModel(model) {
        return {
            id: model.id,
            userId: model.userId,
            firstName: model.firstName,
            lastName: model.lastName,
            email: model.email,
            biography: model.biography,
            createdAt: model.createdAt,
            updatedAt: model.updatedAt,
        };
    }
}
exports.ProfileRepository = ProfileRepository;
