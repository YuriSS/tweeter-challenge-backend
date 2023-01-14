"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindProfileUsecase = void 0;
const uuid_1 = require("@shared/domain/value_objects/uuid/uuid");
class FindProfileUsecase {
    constructor(profileRepository) {
        this.profileRepository = profileRepository;
    }
    async execute(input) {
        const id = new uuid_1.Identifier({ id: input.id });
        const profile = await this.profileRepository.find(id);
        return {
            id: profile.id,
            userId: profile.userId,
            name: {
                firstName: profile.firstName,
                lastName: profile.lastName
            },
            email: profile.email,
            biography: profile.biography,
            updatedAt: profile.updatedAt,
            createdAt: profile.createdAt,
        };
    }
}
exports.FindProfileUsecase = FindProfileUsecase;
