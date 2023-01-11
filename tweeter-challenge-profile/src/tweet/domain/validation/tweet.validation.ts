import { EntityValidation } from "@shared/domain/entities/entity.type";
import { Validator } from "@shared/domain/validation/validation";
import { Identifier } from "@shared/domain/value_objects/uuid/uuid";
import { TweetEntityFields } from "@tweet/domain/entity/tweet.types";

export class TweetValidation implements EntityValidation<TweetEntityFields> {
  public constructor(private validator: Validator) {}

  public configureValidation(fields: TweetEntityFields, context: string): Validator {
    this.validateIdentifier(fields, context)
      .validateComments(fields, context)
      .validateText(fields, context)
      .validateCreatedAt(fields, context)
      .validateUpdatedAt(fields, context);
    return this.validator;
  }

  public validateIdentifier(fields: TweetEntityFields, context: string): TweetValidation {
    this.validator.isValidIdentifier({ value: fields.id, context });
    return this;
  }

  public validateText(fields: TweetEntityFields, context: string): TweetValidation {
    this.validator
      .minSringLength({ value: fields.text, min: 1, context })
      .maxStringLength({ value: fields.text, max: 255, context });
    return this;
  }

  public validateCreatedAt(fields: TweetEntityFields, context: string): TweetValidation {
    this.validator.isDateBeforeOrEquals({ value: fields.createdAt, date: new Date(), context });
    return this;
  }

  public validateUpdatedAt(fields: TweetEntityFields, context: string): TweetValidation {
    this.validator
      .isDateAfterOrEquals({ value: fields.updatedAt, date: fields.createdAt, context })
      .isDateBeforeOrEquals({ value: fields.updatedAt, date: new Date(), context });
    return this;
  }

  public validateComments(fields: TweetEntityFields, context: string): TweetValidation {
    fields.comments.forEach((tweetId: Identifier) => {
      this.validator.isValidIdentifier({ value: tweetId, context });
    });
    return this;
  }
}

export class TweetValidationFactory {
  public static create(validator: Validator): TweetValidation {
    return new TweetValidation(validator);
  }
}
