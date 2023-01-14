"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const profile_repository_model_1 = require("@profile/infrastructure/repository/sequelize/profile.repository.model");
const profile_repository_1 = require("@profile/infrastructure/repository/sequelize/profile.repository");
const profile_1 = require("@profile/domain/entity/profile");
const validator_1 = require("@shared/domain/validator/validator");
const ts_auto_mock_1 = require("ts-auto-mock");
const uuid_1 = require("@shared/domain/value_objects/uuid/uuid");
describe("Profile Repository", () => {
    const date = new Date();
    let sequelize;
    beforeEach(async () => {
        jest.useFakeTimers().setSystemTime(date);
        sequelize = new sequelize_typescript_1.Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });
        sequelize.addModels([profile_repository_model_1.ProfileSequelizeModel]);
        await sequelize.sync();
    });
    afterEach(async () => {
        await sequelize.close();
        jest.useRealTimers();
    });
    it("should create a profile", async () => {
        const profileRepository = new profile_repository_1.ProfileRepository();
        const profileInput = (0, ts_auto_mock_1.createMock)();
        const profile = new profile_1.ProfileEntity(profileInput, (0, validator_1.createFakeValidator)(), (0, uuid_1.createFakeIdentifier)());
        const id = `1e${date.getTime()}`;
        await profileRepository.create(profile);
        const profileModel = await profile_repository_model_1.ProfileSequelizeModel.findOne({ where: { id } });
        expect(profileModel === null || profileModel === void 0 ? void 0 : profileModel.toJSON()).toStrictEqual({
            id,
            userId: profile.userId.value.id,
            firstName: profile.name.firstName,
            lastName: profile.name.lastName,
            email: profile.email.value,
            biography: profile.biography,
            createdAt: profile.createdAt,
            updatedAt: profile.updatedAt
        });
    });
});
