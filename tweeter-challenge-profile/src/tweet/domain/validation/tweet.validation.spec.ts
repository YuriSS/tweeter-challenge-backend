import { createMock } from "ts-auto-mock";
import { TweetEntityFields } from "@tweet/domain/entity/tweet.types";
import { TweetValidationFactory } from "@tweet/domain/validation/tweet.validation";
import { createFakeValidator } from "@shared/domain/validator/validator";
import { Identifier } from "@shared/domain/value_objects/uuid/uuid";
import { DateRegistryValidation } from "@shared/domain/validator/dateRegistry.validation";

describe("TweetValidation", () => {
  const context = 'Tweet';

  it("should validate identifier", () => {
    const tweetMock = createMock<TweetEntityFields>({ id: new Identifier({ id: 'test' }), parent: undefined });
    const validator = createFakeValidator();
    const isValidIdentifierSpy = jest.spyOn(validator, 'isValidIdentifier');

    TweetValidationFactory.create(validator).configureValidation(tweetMock, context);

    expect(isValidIdentifierSpy).toHaveBeenCalledTimes(1);
    expect(isValidIdentifierSpy).toHaveBeenCalledWith({ value: tweetMock.id, context });
  });

  it("should validate text", () => {
    const tweetMock = createMock<TweetEntityFields>({ text: "Testing text" });
    const validator = createFakeValidator();
    const minSringLengthSpy = jest.spyOn(validator, 'minSringLength');
    const maxStringLengthSpy = jest.spyOn(validator, 'maxStringLength');

    TweetValidationFactory.create(validator).configureValidation(tweetMock, context);

    expect(minSringLengthSpy).toHaveBeenCalledTimes(1);
    expect(minSringLengthSpy).toHaveBeenCalledWith({ value: tweetMock.text, min: 1, context });

    expect(maxStringLengthSpy).toHaveBeenCalledTimes(1);
    expect(maxStringLengthSpy).toHaveBeenCalledWith({ value: tweetMock.text, max: 255, context });
  });

  it("should validate createdAt and updatedAt", () => {
    const tweetMock = createMock<TweetEntityFields>({ text: "Testing text" });
    const validator = createFakeValidator();
    const configureDateValidationSpy = jest.spyOn(DateRegistryValidation.prototype, "configureValidation");

    TweetValidationFactory.create(validator).configureValidation(tweetMock, context);

    expect(configureDateValidationSpy).toHaveBeenCalledTimes(1);
    expect(configureDateValidationSpy).toHaveBeenCalledWith(tweetMock, context);
  });

  it("should validate parent", () => {
    const tweetMock = createMock<TweetEntityFields>({
      id: new Identifier({ id: 'id' }),
      parent: new Identifier({ id: 'p1' })
    });
    const validator = createFakeValidator();
    const isValidIdentifierSpy = jest.spyOn(validator, 'isValidIdentifier');

    TweetValidationFactory.create(validator).configureValidation(tweetMock, context);

    expect(isValidIdentifierSpy).toHaveBeenCalledTimes(2);
    expect(isValidIdentifierSpy.mock.calls).toEqual([
      [{ value: tweetMock.id, context }],
      [{ value: tweetMock.parent, context }],
    ]);
  });

});
