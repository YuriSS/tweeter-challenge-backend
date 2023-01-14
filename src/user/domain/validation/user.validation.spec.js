"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = require("@shared/domain/validator/validator");
const uuid_1 = require("@shared/domain/value_objects/uuid/uuid");
const ts_auto_mock_1 = require("ts-auto-mock");
const user_validation_1 = require("@user/domain/validation/user.validation");
const dateRegistry_validation_1 = require("@shared/domain/validator/dateRegistry.validation");
describe("UserValidation", () => {
    const context = "User";
    it("should validate identifier", () => {
        const profileMock = (0, ts_auto_mock_1.createMock)({ id: new uuid_1.Identifier({ id: "test" }) });
        const validator = (0, validator_1.createFakeValidator)();
        const isValidIdentifierSpy = jest.spyOn(validator, "isValidIdentifier");
        user_validation_1.UserValidationFactory.create(validator).validateIdentifier(profileMock, context);
        expect(isValidIdentifierSpy).toHaveBeenCalledTimes(1);
        expect(isValidIdentifierSpy).toHaveBeenCalledWith({ value: profileMock.id, context });
    });
    it("should validate username", () => {
        const profileMock = (0, ts_auto_mock_1.createMock)({ username: "userTest" });
        const validator = (0, validator_1.createFakeValidator)();
        const minSringLengthSpy = jest.spyOn(validator, "minSringLength");
        const maxStringLengthSpy = jest.spyOn(validator, "maxStringLength");
        user_validation_1.UserValidationFactory.create(validator).validateUsername(profileMock, context);
        expect(minSringLengthSpy).toHaveBeenCalledTimes(1);
        expect(minSringLengthSpy).toHaveBeenCalledWith({ value: profileMock.username, min: 15, context });
        expect(maxStringLengthSpy).toHaveBeenCalledTimes(1);
        expect(maxStringLengthSpy).toHaveBeenCalledWith({ value: profileMock.username, max: 255, context });
    });
    it("should validate password", () => {
        const profileMock = (0, ts_auto_mock_1.createMock)({ password: "123" });
        const validator = (0, validator_1.createFakeValidator)();
        const minSringLengthSpy = jest.spyOn(validator, "minSringLength");
        const maxStringLengthSpy = jest.spyOn(validator, "maxStringLength");
        user_validation_1.UserValidationFactory.create(validator).validateUsername(profileMock, context);
        expect(minSringLengthSpy).toHaveBeenCalledTimes(1);
        expect(minSringLengthSpy).toHaveBeenCalledWith({ value: profileMock.username, min: 5, context });
        expect(maxStringLengthSpy).toHaveBeenCalledTimes(1);
        expect(maxStringLengthSpy).toHaveBeenCalledWith({ value: profileMock.username, max: 15, context });
    });
    it("should validate createdAt and updatedAt", () => {
        const profileMock = (0, ts_auto_mock_1.createMock)();
        const validator = (0, validator_1.createFakeValidator)();
        const configureDateValidationSpy = jest.spyOn(dateRegistry_validation_1.DateRegistryValidation.prototype, "configureValidation");
        user_validation_1.UserValidationFactory.create(validator).configureValidation(profileMock, context);
        expect(configureDateValidationSpy).toHaveBeenCalledTimes(1);
        expect(configureDateValidationSpy).toHaveBeenCalledWith(profileMock, context);
    });
});
