import { EntityValidation } from "@shared/domain/entities/entity.type";
import { Validator } from "@shared/domain/validator/validator";
import { ProfileEntityFields } from "@profile/domain/entity/profile.type";
import { DateRegistryValidationFactory } from "@shared/domain/validator/dateRegistry.validation";

export class ProfileValidation implements EntityValidation<ProfileEntityFields> {
  public constructor(private validator: Validator) {}

  public configureValidation(fields: ProfileEntityFields, context: string): Validator {
    this.validateIdentifier(fields, context)
      .validateEmail(fields, context)
      .validateName(fields, context)
      .validateBiography(fields, context);

    DateRegistryValidationFactory.create(this.validator).configureValidation(fields, context);

    return this.validator;
  }

  public validateIdentifier(fields: ProfileEntityFields, context: string): ProfileValidation {
    this.validator.isValidIdentifier({ value: fields.id, context });
    return this;
  }

  public validateEmail(fields: ProfileEntityFields, context: string): ProfileValidation {
    this.validator.isValidEmail({ value: fields.email.value, context });
    return this;
  }

  public validateName(fields: ProfileEntityFields, context: string): ProfileValidation {
    this.validator
      .minSringLength({ value: fields.name.fullName, min: 1, context })
      .maxStringLength({ value: fields.name.fullName, max: 255, context });
    return this;
  }

  public validateBiography(fields: ProfileEntityFields, context: string): ProfileValidation {
    this.validator
      .maxStringLength({ value: fields.biography, max: 255, context });
    return this;
  }
}

export class ProfileValidationFactory {
  public static create(validator: Validator): ProfileValidation {
    return new ProfileValidation(validator);
  }
}