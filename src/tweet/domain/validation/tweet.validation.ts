import { EntityValidation } from "@shared/domain/entities/entity.type";
import { DateRegistryValidationFactory } from "@shared/domain/validator/dateRegistry.validation";
import { Validator } from "@shared/domain/validator/validator";
import { TweetEntityFields } from "@tweet/domain/entity/tweet.types";

export class TweetValidation implements EntityValidation<TweetEntityFields> {
  public constructor(private validator: Validator) {}

  public configureValidation(fields: TweetEntityFields, context: string): Validator {
    this.validateIdentifier(fields, context)
      .validateParent(fields, context)
      .validateText(fields, context)

    DateRegistryValidationFactory.create(this.validator).configureValidation(fields, context);

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

  public validateParent(fields: TweetEntityFields, context: string): TweetValidation {
    if (!fields.parent) return this;
    this.validator.isValidIdentifier({ value: fields.parent, context });
    return this;
  }
}

export class TweetValidationFactory {
  public static create(validator: Validator): TweetValidation {
    return new TweetValidation(validator);
  }
}
