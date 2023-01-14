"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_auto_mock_1 = require("ts-auto-mock");
const tweet_1 = require("@tweet/domain/entity/tweet");
const validator_1 = require("@shared/domain/validator/validator");
const uuid_1 = require("@shared/domain/value_objects/uuid/uuid");
describe('TweetEntity', () => {
    const date = new Date();
    beforeEach(() => {
        jest.useFakeTimers().setSystemTime(date);
    });
    afterEach(() => {
        jest.useRealTimers();
    });
    it("should instance correctly a profile", () => {
        const tweetMock = (0, ts_auto_mock_1.createMock)({
            id: undefined,
            createdAt: undefined,
            updatedAt: undefined,
            parent: undefined,
        });
        const identifierMaker = (0, uuid_1.createFakeIdentifier)();
        const identifierMakerSpy = jest.spyOn(identifierMaker, 'make');
        const tweet = new tweet_1.TweetEntity(tweetMock, (0, validator_1.createFakeValidator)(), identifierMaker);
        expect(identifierMakerSpy).toHaveBeenCalledTimes(1);
        expect(tweet.parent).toBeUndefined();
        expect(tweet.text).toBe(tweetMock.text);
        expect(tweet.createdAt).toEqual(date);
        expect(tweet.updatedAt).toEqual(date);
        expect(tweet.id).toBeTruthy();
    });
});
