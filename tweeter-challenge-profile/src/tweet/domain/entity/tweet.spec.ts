import { createMock } from "ts-auto-mock";
import { TweetEntity } from "@tweet/domain/entity/tweet";
import { createFakeValidator } from "@shared/domain/validator/validator";
import { createFakeIdentifier } from "@shared/domain/value_objects/uuid/uuid";

describe('TweetEntity', () => {
  const date = new Date();

  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(date);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should instance correctly a profile", () => {
    const tweetMock = createMock<TweetEntity>({
      id: undefined,
      createdAt: undefined,
      updatedAt: undefined,
      parent: undefined,
    });
    const identifierMaker = createFakeIdentifier();
    const identifierMakerSpy = jest.spyOn(identifierMaker, 'make');

    const tweet = new TweetEntity(tweetMock, createFakeValidator(), identifierMaker);

    expect(identifierMakerSpy).toHaveBeenCalledTimes(1);
    expect(tweet.parent).toBeUndefined();
    expect(tweet.text).toBe(tweetMock.text);
    expect(tweet.createdAt).toEqual(date);
    expect(tweet.updatedAt).toEqual(date);
    expect(tweet.id).toBeTruthy();
  });
});
