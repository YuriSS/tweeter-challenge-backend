import { Entity } from "@shared/domain/entities/entity";
import { Identifier } from "@shared/domain/value_objects/uuid/uuid";

export interface TweetEntityFields {
  text: string;
  updatedAt?: Date;
  createdAt?: Date;
  retweets?: Identifier[];
}

export class TweetEntity extends Entity<TweetEntityFields, Required<TweetEntityFields>> {
  public constructor(fields: TweetEntityFields, id: Identifier) {
    super(fields, id);
  }

  public get text(): string {
    return this._fields.text;
  }

  public get retweets(): Identifier[] {
    return this._fields.retweets;
  }

  public get updatedAt(): Date {
    return this._fields.updatedAt;
  }

  public get createdAt(): Date {
    return this._fields.createdAt;
  }

  protected override mountFields(fields: TweetEntityFields): Required<TweetEntityFields> {
    return {
      text: fields.text,
      updatedAt: fields.updatedAt || new Date(),
      createdAt: fields.createdAt || new Date(),
      retweets: fields.retweets || [],
    }
  }
}
