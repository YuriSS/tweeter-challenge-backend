import { EntityValidation } from "@shared/domain/entities/entity.type";
import { DateRegistryValidationFactory } from "@shared/domain/validator/dateRegistry.validation";
import { Validator } from "@shared/domain/validator/validator";
import { UserEntityFields } from "@user/domain/entity/user.type";

export class UserValidation implements EntityValidation<UserEntityFields> {
  public constructor(private validator: Validator) {}

  public configureValidation(fields: UserEntityFields, context: string): Validator {
    this.validateIdentifier(fields, context)
      .validateUsername(fields, context)
      .validatePassword(fields, context)
      .validateEmail(fields, context);

    DateRegistryValidationFactory.create(this.validator).configureValidation(fields, context);

    return this.validator;
  }

  public validateIdentifier(fields: UserEntityFields, context: string): UserValidation {
    this.validator.isValidIdentifier({ value: fields?.id, key: "id", context });
    return this;
  }

  public validateUsername(fields: UserEntityFields, context: string): UserValidation {
    this.validator
      .minSringLength({ value: fields?.username, min: 5, key: "username", context })
      .maxStringLength({ value: fields?.username, max: 15, key: "username", context });
    return this;
  }

  public validatePassword(fields: UserEntityFields, context: string): UserValidation {
    this.validator
      .minSringLength({ value: fields?.password, min: 5, key: "password", context })
      .maxStringLength({ value: fields?.password, max: 15, key: "password", context });
    return this;
  }

  public validateEmail(fields: UserEntityFields, context: string): UserValidation {
    this.validator.isValidEmail({ value: fields?.email.value, key: "email", context });
    return this;
  }
}

export class UserValidationFactory {
  public static create(validator: Validator): UserValidation {
    return new UserValidation(validator);
  }
}
