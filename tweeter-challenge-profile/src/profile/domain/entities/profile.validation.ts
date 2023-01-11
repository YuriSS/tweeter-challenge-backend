import { EntityValidation } from "@shared/domain/entities/entity.type";
import { Validator } from "@shared/domain/validation/validation";
import { Identifier } from "@shared/domain/value_objects/uuid/uuid";
import { ProfileEntityFields } from "@profile/domain/entities/profile.type";

export class ProfileValidation implements EntityValidation<ProfileEntityFields> {
  public constructor(private validator: Validator) {}

  public configureValidation(fields: ProfileEntityFields, context: string): Validator {
    this.validateIdentifier(fields, context)
      .validateEmail(fields, context)
      .validateName(fields, context)
      .validateBiography(fields, context)
      .validateTweets(fields, context);

    return this.validator;
  }

  public validateIdentifier(fields: ProfileEntityFields, context: string): ProfileValidation {
    this.validator.isValidIdentifier({ value: fields.id, context });
    return this;
  }

  public validateEmail(fields: ProfileEntityFields, context: string): ProfileValidation {
    this.validator.isValidEmail({ value: fields.email, context });
    return this;
  }

  public validateName(fields: ProfileEntityFields, context: string): ProfileValidation {
    this.validator
      .minSringLength({ value: fields.name, min: 1, context })
      .maxStringLength({ value: fields.name, max: 255, context });
    return this;
  }

  public validateBiography(fields: ProfileEntityFields, context: string): ProfileValidation {
    this.validator
      .maxStringLength({ value: fields.biography, max: 255, context });
    return this;
  }

  public validateTweets(fields: ProfileEntityFields, context: string): ProfileValidation {
    fields.tweets.forEach((tweetId: Identifier) => {
      this.validator.isValidIdentifier({ value: tweetId, context });
    });
    return this;
  }
}

export class ProfileValidationFactory {
  public static create(validator: Validator): ProfileValidation {
    return new ProfileValidation(validator);
  }
}
