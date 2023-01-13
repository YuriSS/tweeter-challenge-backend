import { Entity } from "@shared/domain/entities/entity";
import { Validator } from "@shared/domain/validator/validator";
import { Identifier, MakeIdentifier } from "@shared/domain/value_objects/uuid/uuid";
import { TweetEntityFields, TweetEntityInput } from "@tweet/domain/entity/tweet.types";
import { TweetValidationFactory } from "@tweet/domain/validation/tweet.validation";

export class TweetEntity extends Entity<TweetEntityInput, TweetEntityFields> {
  public constructor(fields: TweetEntityFields, protected validator: Validator, protected makeIdentifier: MakeIdentifier) {
    super(fields, validator, makeIdentifier, 'Tweet');
  }

  public get text(): string {
    return this._fields.text;
  }

  public get parent(): Identifier | undefined {
    return this._fields.parent;
  }

  protected override mountFields(fields: TweetEntityInput): TweetEntityFields {
    return {
      id: fields.id || this.makeIdentifier.make(),
      text: fields.text,
      parent: fields.parent,
      updatedAt: fields.updatedAt || new Date(),
      createdAt: fields.createdAt || new Date(),
    }
  }

  protected override configureValidation(): Validator {
    return TweetValidationFactory.create(this.validator).configureValidation(this._fields, this.entityName);
  }
}
