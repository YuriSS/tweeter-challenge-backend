import { createFakeValidator } from "@shared/domain/validator/validator";
import { Identifier } from "@shared/domain/value_objects/uuid/uuid";
import { createMock } from "ts-auto-mock";
import { UserEntityFields } from "@user/domain/entity/user.type";
import { UserValidationFactory } from "@user/domain/validation/user.validation";
import { DateRegistryValidation } from "@shared/domain/validator/dateRegistry.validation";
import { Email } from "@shared/domain/value_objects/email/email";

describe("UserValidation", () => {
  const context = "User";

  it("should configure properly", () => {
    const profileMock = createMock<UserEntityFields>();
    const validator = createFakeValidator();
    const userValidator = UserValidationFactory.create(validator);
    const validatorsToCall = [
      jest.spyOn(userValidator, "validateIdentifier"),
      jest.spyOn(userValidator, "validateUsername"),
      jest.spyOn(userValidator, "validatePassword"),
      jest.spyOn(userValidator, "validateEmail"),
      jest.spyOn(DateRegistryValidation.prototype, "configureValidation"),
    ];

    userValidator.configureValidation(profileMock, context);

    validatorsToCall.forEach((validator) => {
      expect(validator).toHaveBeenCalledTimes(1);
      expect(validator).toHaveBeenCalledWith(profileMock, context);
    });
  });

  it("should validate identifier", () => {
    const profileMock = createMock<UserEntityFields>({
      id: new Identifier({ id: "test" }),
    });
    const validator = createFakeValidator();
    const isValidIdentifierSpy = jest.spyOn(validator, "isValidIdentifier");

    UserValidationFactory.create(validator).validateIdentifier(
      profileMock,
      context
    );

    expect(isValidIdentifierSpy).toHaveBeenCalledTimes(1);
    expect(isValidIdentifierSpy).toHaveBeenCalledWith({
      value: profileMock.id,
      key: "id",
      context,
    });
  });

  it("should validate username", () => {
    const profileMock = createMock<UserEntityFields>({ username: "userTest" });
    const validator = createFakeValidator();
    const minSringLengthSpy = jest.spyOn(validator, "minSringLength");
    const maxStringLengthSpy = jest.spyOn(validator, "maxStringLength");

    UserValidationFactory.create(validator).validateUsername(
      profileMock,
      context
    );

    expect(minSringLengthSpy).toHaveBeenCalledTimes(1);
    expect(minSringLengthSpy).toHaveBeenCalledWith({
      value: profileMock.username,
      min: 5,
      key: "username",
      context,
    });

    expect(maxStringLengthSpy).toHaveBeenCalledTimes(1);
    expect(maxStringLengthSpy).toHaveBeenCalledWith({
      value: profileMock.username,
      max: 15,
      key: "username",
      context,
    });
  });

  it("should validate password", () => {
    const profileMock = createMock<UserEntityFields>({ password: "123" });
    const validator = createFakeValidator();
    const minSringLengthSpy = jest.spyOn(validator, "minSringLength");
    const maxStringLengthSpy = jest.spyOn(validator, "maxStringLength");

    UserValidationFactory.create(validator).validatePassword(
      profileMock,
      context
    );

    expect(minSringLengthSpy).toHaveBeenCalledTimes(1);
    expect(minSringLengthSpy).toHaveBeenCalledWith({
      value: profileMock.password,
      min: 5,
      key: "password",
      context,
    });

    expect(maxStringLengthSpy).toHaveBeenCalledTimes(1);
    expect(maxStringLengthSpy).toHaveBeenCalledWith({
      value: profileMock.password,
      max: 15,
      key: "password",
      context,
    });
  });

  it("should validate email", () => {
    const profileMock = createMock<UserEntityFields>({
      email: new Email("jhon_doe@gmail.com"),
    });
    const validator = createFakeValidator();
    const isValidEmailSpy = jest.spyOn(validator, "isValidEmail");

    UserValidationFactory.create(validator).validateEmail(profileMock, context);

    expect(isValidEmailSpy).toHaveBeenCalledTimes(1);
    expect(isValidEmailSpy).toHaveBeenCalledWith({
      value: profileMock.email.value,
      key: "email",
      context,
    });
  });
});
