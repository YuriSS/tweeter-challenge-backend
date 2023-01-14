"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = require("@shared/domain/validator/validator");
const uuid_1 = require("@shared/domain/value_objects/uuid/uuid");
const ts_auto_mock_1 = require("ts-auto-mock");
const profile_validation_1 = require("@profile/domain/validation/profile.validation");
const email_1 = require("@shared/domain/value_objects/email/email");
const name_1 = require("@shared/domain/value_objects/name/name");
const dateRegistry_validation_1 = require("@shared/domain/validator/dateRegistry.validation");
describe("ProfileValidation", () => {
    const context = "Profile";
    it("should validate identifier", () => {
        const profileMock = (0, ts_auto_mock_1.createMock)({ id: new uuid_1.Identifier({ id: "test" }) });
        const validator = (0, validator_1.createFakeValidator)();
        const isValidIdentifierSpy = jest.spyOn(validator, "isValidIdentifier");
        profile_validation_1.ProfileValidationFactory.create(validator).validateIdentifier(profileMock, context);
        expect(isValidIdentifierSpy).toHaveBeenCalledTimes(1);
        expect(isValidIdentifierSpy).toHaveBeenCalledWith({ value: profileMock.id, context });
    });
    it("should validate email", () => {
        const profileMock = (0, ts_auto_mock_1.createMock)({ email: new email_1.Email("test") });
        const validator = (0, validator_1.createFakeValidator)();
        const isValidEmailSpy = jest.spyOn(validator, "isValidEmail");
        profile_validation_1.ProfileValidationFactory.create(validator).validateEmail(profileMock, context);
        expect(isValidEmailSpy).toHaveBeenCalledTimes(1);
        expect(isValidEmailSpy).toHaveBeenCalledWith({ value: profileMock.email.value, context });
    });
    it("should validate name", () => {
        const profileMock = (0, ts_auto_mock_1.createMock)({ name: new name_1.Name({ firstName: "Jhon", lastName: "Tester" }) });
        const validator = (0, validator_1.createFakeValidator)();
        const minSringLengthSpy = jest.spyOn(validator, "minSringLength");
        const maxStringLengthSpy = jest.spyOn(validator, "maxStringLength");
        profile_validation_1.ProfileValidationFactory.create(validator).validateName(profileMock, context);
        expect(minSringLengthSpy).toHaveBeenCalledTimes(1);
        expect(minSringLengthSpy).toHaveBeenCalledWith({ value: profileMock.name.fullName, min: 1, context });
        expect(maxStringLengthSpy).toHaveBeenCalledTimes(1);
        expect(maxStringLengthSpy).toHaveBeenCalledWith({ value: profileMock.name.fullName, max: 255, context });
    });
    it("should validate biography", () => {
        const profileMock = (0, ts_auto_mock_1.createMock)({ biography: "bio" });
        const validator = (0, validator_1.createFakeValidator)();
        const maxSringLengthSpy = jest.spyOn(validator, "maxStringLength");
        profile_validation_1.ProfileValidationFactory.create(validator).validateBiography(profileMock, context);
        expect(maxSringLengthSpy).toHaveBeenCalledTimes(1);
        expect(maxSringLengthSpy).toHaveBeenCalledWith({ value: profileMock.biography, max: 255, context });
    });
    it("should validate createdAt and updatedAt", () => {
        const profileMock = (0, ts_auto_mock_1.createMock)({ email: new email_1.Email("test"), name: new name_1.Name({ firstName: "test", lastName: "test" }) });
        const validator = (0, validator_1.createFakeValidator)();
        const configureDateValidationSpy = jest.spyOn(dateRegistry_validation_1.DateRegistryValidation.prototype, "configureValidation");
        profile_validation_1.ProfileValidationFactory.create(validator).configureValidation(profileMock, context);
        expect(configureDateValidationSpy).toHaveBeenCalledTimes(1);
        expect(configureDateValidationSpy).toHaveBeenCalledWith(profileMock, context);
    });
});
