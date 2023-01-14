"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_auto_mock_1 = require("ts-auto-mock");
const tweet_validation_1 = require("@tweet/domain/validation/tweet.validation");
const validator_1 = require("@shared/domain/validator/validator");
const uuid_1 = require("@shared/domain/value_objects/uuid/uuid");
const dateRegistry_validation_1 = require("@shared/domain/validator/dateRegistry.validation");
describe("TweetValidation", () => {
    const context = 'Tweet';
    it("should validate identifier", () => {
        const tweetMock = (0, ts_auto_mock_1.createMock)({ id: new uuid_1.Identifier({ id: 'test' }), parent: undefined });
        const validator = (0, validator_1.createFakeValidator)();
        const isValidIdentifierSpy = jest.spyOn(validator, 'isValidIdentifier');
        debugger;
        tweet_validation_1.TweetValidationFactory.create(validator).configureValidation(tweetMock, context);
        expect(isValidIdentifierSpy).toHaveBeenCalledTimes(1);
        expect(isValidIdentifierSpy).toHaveBeenCalledWith({ value: tweetMock.id, context });
    });
    it("should validate text", () => {
        const tweetMock = (0, ts_auto_mock_1.createMock)({ text: "Testing text" });
        const validator = (0, validator_1.createFakeValidator)();
        const minSringLengthSpy = jest.spyOn(validator, 'minSringLength');
        const maxStringLengthSpy = jest.spyOn(validator, 'maxStringLength');
        tweet_validation_1.TweetValidationFactory.create(validator).configureValidation(tweetMock, context);
        expect(minSringLengthSpy).toHaveBeenCalledTimes(1);
        expect(minSringLengthSpy).toHaveBeenCalledWith({ value: tweetMock.text, min: 1, context });
        expect(maxStringLengthSpy).toHaveBeenCalledTimes(1);
        expect(maxStringLengthSpy).toHaveBeenCalledWith({ value: tweetMock.text, max: 255, context });
    });
    it("should validate createdAt and updatedAt", () => {
        const tweetMock = (0, ts_auto_mock_1.createMock)({ text: "Testing text" });
        const validator = (0, validator_1.createFakeValidator)();
        const configureDateValidationSpy = jest.spyOn(dateRegistry_validation_1.DateRegistryValidation.prototype, "configureValidation");
        tweet_validation_1.TweetValidationFactory.create(validator).configureValidation(tweetMock, context);
        expect(configureDateValidationSpy).toHaveBeenCalledTimes(1);
        expect(configureDateValidationSpy).toHaveBeenCalledWith(tweetMock, context);
    });
    it("should validate parent", () => {
        const tweetMock = (0, ts_auto_mock_1.createMock)({
            id: new uuid_1.Identifier({ id: 'id' }),
            parent: new uuid_1.Identifier({ id: 'p1' })
        });
        const validator = (0, validator_1.createFakeValidator)();
        const isValidIdentifierSpy = jest.spyOn(validator, 'isValidIdentifier');
        tweet_validation_1.TweetValidationFactory.create(validator).configureValidation(tweetMock, context);
        expect(isValidIdentifierSpy).toHaveBeenCalledTimes(2);
        expect(isValidIdentifierSpy.mock.calls).toEqual([
            [{ value: tweetMock.id, context }],
            [{ value: tweetMock.parent, context }],
        ]);
    });
});
