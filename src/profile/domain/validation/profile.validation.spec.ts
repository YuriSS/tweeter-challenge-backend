import { createFakeValidator } from "@shared/domain/validator/validator";
import { Identifier } from "@shared/domain/value_objects/uuid/uuid";
import { createMock } from "ts-auto-mock";
import { ProfileEntityFields } from "@profile/domain/entity/profile.type";
import { ProfileValidationFactory } from "@profile/domain/validation/profile.validation";
import { Name } from "@shared/domain/value_objects/name/name";
import { DateRegistryValidation } from "@shared/domain/validator/dateRegistry.validation";

describe("ProfileValidation", () => {
  const context = "Profile";

  it("should configure properly", () => {
    const profileMock = createMock<ProfileEntityFields>();
    const validator = createFakeValidator();
    const userValidator = ProfileValidationFactory.create(validator);
    const validatorsToCall = [
      jest.spyOn(userValidator, "validateIdentifier"),
      jest.spyOn(userValidator, "validateName"),
      jest.spyOn(userValidator, "validateBiography"),
      jest.spyOn(DateRegistryValidation.prototype, "configureValidation"),
    ];

    userValidator.configureValidation(profileMock, context);

    validatorsToCall.forEach((validator) => {
      expect(validator).toHaveBeenCalledTimes(1);
      expect(validator).toHaveBeenCalledWith(profileMock, context);
    });
  });

  it("should validate identifier", () => {
    const profileMock = createMock<ProfileEntityFields>({
      id: new Identifier({ id: "test" }),
    });
    const validator = createFakeValidator();
    const isValidIdentifierSpy = jest.spyOn(validator, "isValidIdentifier");

    ProfileValidationFactory.create(validator).validateIdentifier(
      profileMock,
      context
    );

    expect(isValidIdentifierSpy).toHaveBeenCalledTimes(1);
    expect(isValidIdentifierSpy).toHaveBeenCalledWith({
      value: profileMock.id,
      context,
    });
  });

  it("should validate name", () => {
    const profileMock = createMock<ProfileEntityFields>({
      name: new Name({ firstName: "Jhon", lastName: "Tester" }),
    });
    const validator = createFakeValidator();
    const minSringLengthSpy = jest.spyOn(validator, "minSringLength");
    const maxStringLengthSpy = jest.spyOn(validator, "maxStringLength");

    ProfileValidationFactory.create(validator).validateName(
      profileMock,
      context
    );

    expect(minSringLengthSpy).toHaveBeenCalledTimes(1);
    expect(minSringLengthSpy).toHaveBeenCalledWith({
      value: profileMock.name.fullName,
      min: 1,
      context,
    });

    expect(maxStringLengthSpy).toHaveBeenCalledTimes(1);
    expect(maxStringLengthSpy).toHaveBeenCalledWith({
      value: profileMock.name.fullName,
      max: 255,
      context,
    });
  });

  it("should validate biography", () => {
    const profileMock = createMock<ProfileEntityFields>({ biography: "bio" });
    const validator = createFakeValidator();
    const maxSringLengthSpy = jest.spyOn(validator, "maxStringLength");

    ProfileValidationFactory.create(validator).validateBiography(
      profileMock,
      context
    );

    expect(maxSringLengthSpy).toHaveBeenCalledTimes(1);
    expect(maxSringLengthSpy).toHaveBeenCalledWith({
      value: profileMock.biography,
      max: 255,
      context,
    });
  });
});
