import { Identifier } from "@shared/domain/value_objects/uuid/uuid";
import { createMock } from "ts-auto-mock";
import { TweetEntityFields } from "@tweet/domain/entities/tweet.types";
import { createFakeValidator } from "@shared/domain/validation/validation";
import { TweetValidationFactory } from "./tweet.validation";

describe("TweetValidation", () => {
  const context = 'Tweet';

  it("should validate identifier", () => {
    const tweetMock = createMock<TweetEntityFields>({ id: new Identifier({ id: 'test' }), comments: [] });
    const validator = createFakeValidator();
    const isValidIdentifierSpy = jest.spyOn(validator, 'isValidIdentifier');

    TweetValidationFactory.create(validator).configureValidation(tweetMock, context);

    expect(isValidIdentifierSpy).toHaveBeenCalledTimes(1);
    expect(isValidIdentifierSpy).toHaveBeenCalledWith({ value: tweetMock.id, context });
  });

  it("should validate text", () => {
    const tweetMock = createMock<TweetEntityFields>({ text: "Testing text", comments: [] });
    const validator = createFakeValidator();
    const minSringLengthSpy = jest.spyOn(validator, 'minSringLength');
    const maxStringLengthSpy = jest.spyOn(validator, 'maxStringLength');

    TweetValidationFactory.create(validator).configureValidation(tweetMock, context);

    expect(minSringLengthSpy).toHaveBeenCalledTimes(1);
    expect(minSringLengthSpy).toHaveBeenCalledWith({ value: tweetMock.text, min: 1, context });

    expect(maxStringLengthSpy).toHaveBeenCalledTimes(1);
    expect(maxStringLengthSpy).toHaveBeenCalledWith({ value: tweetMock.text, max: 255, context });
  });

  it("should validate comments", () => {
    const tweetMock = createMock<TweetEntityFields>({
      id: new Identifier({ id: 'id' }),
      comments: [new Identifier({ id: 'c1' }), new Identifier({ id: 'c2' })]
    });
    const validator = createFakeValidator();
    const isValidIdentifierSpy = jest.spyOn(validator, 'isValidIdentifier');

    TweetValidationFactory.create(validator).configureValidation(tweetMock, context);

    expect(isValidIdentifierSpy).toHaveBeenCalledTimes(3);
    expect(isValidIdentifierSpy.mock.calls).toEqual([
      [{ value: tweetMock.id, context }],
      [{ value: new Identifier({ id: 'c1' }), context }],
      [{ value: new Identifier({ id: 'c2' }), context }],
    ]);
  });

});
