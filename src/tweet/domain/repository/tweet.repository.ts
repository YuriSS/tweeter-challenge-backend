import { TweetEntity } from "@tweet/domain/entity/tweet";
import { Repository } from "@shared/domain/repositories/repostory";

export interface TweetRepository extends Repository<TweetEntity> {}
