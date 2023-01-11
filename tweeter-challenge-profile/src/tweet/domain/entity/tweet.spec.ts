import { createMock } from "ts-auto-mock";
import { TweetEntity } from "@tweet/domain/entity/tweet";
import { createFakeValidator } from "@shared/domain/validation/validation";

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
      createdAt: undefined,
      updatedAt: undefined,
      comments: undefined,
    });
    const tweet = new TweetEntity(tweetMock, createFakeValidator());

    expect(tweet.comments).toEqual([]);
    expect(tweet.text).toBe(tweetMock.text);
    expect(tweet.createdAt).toEqual(date);
    expect(tweet.updatedAt).toEqual(date);
    expect(tweet.id).toEqual(tweetMock.id);
  });
});
