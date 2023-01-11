import { Entity } from "@shared/domain/entities/entity";
import { Validator } from "@shared/domain/validation/validation";
import { Identifier } from "@shared/domain/value_objects/uuid/uuid";
import { TweetEntityFields, TweetEntityInput } from "@tweet/domain/entity/tweet.types";
import { TweetValidationFactory } from "@tweet/domain/validation/tweet.validation";

export class TweetEntity extends Entity<TweetEntityInput, TweetEntityFields> {
  public constructor(fields: TweetEntityFields, protected validator: Validator) {
    super(fields, validator, 'Tweet');
  }

  public get text(): string {
    return this._fields.text;
  }

  public get comments(): Identifier[] {
    return this._fields.comments;
  }

  public get updatedAt(): Date {
    return this._fields.updatedAt;
  }

  public get createdAt(): Date {
    return this._fields.createdAt;
  }

  protected override mountFields(fields: TweetEntityInput): TweetEntityFields {
    return {
      id: fields.id,
      text: fields.text,
      updatedAt: fields.updatedAt || new Date(),
      createdAt: fields.createdAt || new Date(),
      comments: fields.comments || [],
    }
  }

  protected override configureValidation(): Validator {
    return TweetValidationFactory.create(this.validator).configureValidation(this._fields, this.entityName);
  }
}
