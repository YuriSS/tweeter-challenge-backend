import { createFakeValidator } from "@shared/domain/validator/validator";
import { Identifier } from "@shared/domain/value_objects/uuid/uuid";
import { createMock } from "ts-auto-mock";
import { ProfileEntityFields } from "@profile/domain/entity/profile.type";
import { ProfileValidationFactory } from "@profile/domain/validation/profile.validation";
import { Email } from "@shared/domain/value_objects/email/email";
import { Name } from "@shared/domain/value_objects/name/name";

describe("ProfileValidation", () => {
  const context = "Profile";

  it("should validate identifier", () => {
    const profileMock = createMock<ProfileEntityFields>({ id: new Identifier({ id: "test" }), tweets: [] });
    const validator = createFakeValidator();
    const isValidIdentifierSpy = jest.spyOn(validator, "isValidIdentifier");

    ProfileValidationFactory.create(validator).validateIdentifier(profileMock, context);

    expect(isValidIdentifierSpy).toHaveBeenCalledTimes(1);
    expect(isValidIdentifierSpy).toHaveBeenCalledWith({ value: profileMock.id, context });
  });

  it("should validate email", () => {
    const profileMock = createMock<ProfileEntityFields>({ email: new Email("test") });
    const validator = createFakeValidator();
    const isValidEmailSpy = jest.spyOn(validator, "isValidEmail");

    ProfileValidationFactory.create(validator).validateEmail(profileMock, context);

    expect(isValidEmailSpy).toHaveBeenCalledTimes(1);
    expect(isValidEmailSpy).toHaveBeenCalledWith({ value: profileMock.email.value, context });
  });

  it("should validate name", () => {
    const profileMock = createMock<ProfileEntityFields>({ name: new Name({ firstName: "Jhon", lastName: "Tester" }) });
    const validator = createFakeValidator();
    const minSringLengthSpy = jest.spyOn(validator, "minSringLength");
    const maxStringLengthSpy = jest.spyOn(validator, "maxStringLength");

    ProfileValidationFactory.create(validator).validateName(profileMock, context);

    expect(minSringLengthSpy).toHaveBeenCalledTimes(1);
    expect(minSringLengthSpy).toHaveBeenCalledWith({ value: profileMock.name.fullName, min: 1, context });

    expect(maxStringLengthSpy).toHaveBeenCalledTimes(1);
    expect(maxStringLengthSpy).toHaveBeenCalledWith({ value: profileMock.name.fullName, max: 255, context });
  });

  it("should validate biography", () => {
    const profileMock = createMock<ProfileEntityFields>({ biography: "bio" });
    const validator = createFakeValidator();
    const maxSringLengthSpy = jest.spyOn(validator, "maxStringLength");

    ProfileValidationFactory.create(validator).validateBiography(profileMock, context);

    expect(maxSringLengthSpy).toHaveBeenCalledTimes(1);
    expect(maxSringLengthSpy).toHaveBeenCalledWith({ value: profileMock.biography, max: 255, context });
  });

  it("should validate tweets", () => {
    const profileMock = createMock<ProfileEntityFields>({
      id: new Identifier({ id: "id" }),
      tweets: [new Identifier({ id: "t1" }), new Identifier({ id: "t2" })]
    });
    const validator = createFakeValidator();
    const isValidIdentifierSpy = jest.spyOn(validator, "isValidIdentifier");

    ProfileValidationFactory.create(validator).validateTweets(profileMock, context);

    expect(isValidIdentifierSpy).toHaveBeenCalledTimes(2);
    expect(isValidIdentifierSpy.mock.calls).toEqual([
      [{ value: new Identifier({ id: "t1" }), context }],
      [{ value: new Identifier({ id: "t2" }), context }],
    ]);
  });
});
