import { createMock } from "ts-auto-mock";
import { TweetEntity } from "@tweet/domain/entities/tweet";
import { Identifier } from "@shared/domain/value_objects/uuid/uuid";

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
      retweets: undefined,
    });
    const id = new Identifier({ id: '1' }, { hasError: (): undefined => undefined });
    const tweet = new TweetEntity(tweetMock, id);

    expect(tweet.retweets).toEqual([]);
    expect(tweet.text).toBe(tweetMock.text);
    expect(tweet.createdAt).toEqual(date);
    expect(tweet.updatedAt).toEqual(date);
    expect(tweet.id).toBeInstanceOf(Identifier);
  });
})
