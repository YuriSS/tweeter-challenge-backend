import { Identifier } from "@shared/domain/value_objects/uuid/uuid";

export interface TweetEntityInput {
  id: Identifier;
  text: string;
  updatedAt?: Date;
  createdAt?: Date;
  parent?: Identifier;
}

export type TweetEntityFields = Required<Omit<TweetEntityInput, "parent">> & { parent?: Identifier };
