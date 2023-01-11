import { Identifier } from "@shared/domain/value_objects/uuid/uuid";

export interface TweetEntityInput {
  id: Identifier;
  text: string;
  updatedAt?: Date;
  createdAt?: Date;
  comments?: Identifier[];
}

export type TweetEntityFields = Required<TweetEntityInput>;
