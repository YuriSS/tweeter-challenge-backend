import { createFakeValidator } from "@shared/domain/validator/validator";
import { Identifier } from "@shared/domain/value_objects/uuid/uuid";
import { createMock } from "ts-auto-mock";
import { UserEntityFields } from "@user/domain/entity/user.type";
import { UserValidationFactory } from "@user/domain/validation/user.validation";
import { DateRegistryValidation } from "@shared/domain/validator/dateRegistry.validation";

describe("UserValidation", () => {
  const context = "User";

  it("should validate identifier", () => {
    const profileMock = createMock<UserEntityFields>({ id: new Identifier({ id: "test" }) });
    const validator = createFakeValidator();
    const isValidIdentifierSpy = jest.spyOn(validator, "isValidIdentifier");

    UserValidationFactory.create(validator).validateIdentifier(profileMock, context);

    expect(isValidIdentifierSpy).toHaveBeenCalledTimes(1);
    expect(isValidIdentifierSpy).toHaveBeenCalledWith({ value: profileMock.id, context });
  });

  it("should validate username", () => {
    const profileMock = createMock<UserEntityFields>({ username: "userTest" });
    const validator = createFakeValidator();
    const minSringLengthSpy = jest.spyOn(validator, "minSringLength");
    const maxStringLengthSpy = jest.spyOn(validator, "maxStringLength");

    UserValidationFactory.create(validator).validateUsername(profileMock, context);

    expect(minSringLengthSpy).toHaveBeenCalledTimes(1);
    expect(minSringLengthSpy).toHaveBeenCalledWith({ value: profileMock.username, min: 15, context });

    expect(maxStringLengthSpy).toHaveBeenCalledTimes(1);
    expect(maxStringLengthSpy).toHaveBeenCalledWith({ value: profileMock.username, max: 255, context });
  });

  it("should validate password", () => {
    const profileMock = createMock<UserEntityFields>({ password: "123" });
    const validator = createFakeValidator();
    const minSringLengthSpy = jest.spyOn(validator, "minSringLength");
    const maxStringLengthSpy = jest.spyOn(validator, "maxStringLength");

    UserValidationFactory.create(validator).validateUsername(profileMock, context);

    expect(minSringLengthSpy).toHaveBeenCalledTimes(1);
    expect(minSringLengthSpy).toHaveBeenCalledWith({ value: profileMock.username, min: 5, context });

    expect(maxStringLengthSpy).toHaveBeenCalledTimes(1);
    expect(maxStringLengthSpy).toHaveBeenCalledWith({ value: profileMock.username, max: 15, context });
  });

  it("should validate createdAt and updatedAt", () => {
    const profileMock = createMock<UserEntityFields>();
    const validator = createFakeValidator();
    const configureDateValidationSpy = jest.spyOn(DateRegistryValidation.prototype, "configureValidation");

    UserValidationFactory.create(validator).configureValidation(profileMock, context);

    expect(configureDateValidationSpy).toHaveBeenCalledTimes(1);
    expect(configureDateValidationSpy).toHaveBeenCalledWith(profileMock, context);
  });
});
