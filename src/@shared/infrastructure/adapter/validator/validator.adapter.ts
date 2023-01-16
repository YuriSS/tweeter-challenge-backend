import {
  Validator,
  ValidatorFields,
  ValidationErrorFields,
} from "@shared/domain/validator/validator";
import { Identifier } from "@shared/domain/value_objects/uuid/uuid";
import validator from "validator";

export class ValidatorAdapter implements Validator {
  private validationErrors: ValidationErrorFields[] = [];

  public validate(): ValidationErrorFields[] {
    return this.validationErrors;
  }

  public isValidEmail(field: ValidatorFields<string>): ValidatorAdapter {
    return this.validator(
      "Email",
      field,
      !!field.value && validator.isEmail(field.value)
    );
  }

  public isValidIdentifier(field: ValidatorFields<Identifier>): ValidatorAdapter {
    return this.validator(
      "Id",
      field,
      !!field.value && validator.isUUID(field.value.value.id)
    );
  }

  public isEmptyString(_: ValidatorFields<string>): ValidatorAdapter {
    throw new Error("Not implemented yet");
  }

  public maxStringLength(
    field: ValidatorFields<string> & { max: number }
  ): ValidatorAdapter {
    const key = field.key || "String";
    return this.validator(
      key,
      field,
      validator.isLength(field.value, { max: field.max }),
      `${key} length need to be less than ${field.max}`
    );
  }

  public minSringLength(
    field: ValidatorFields<string> & { min: number }
  ): ValidatorAdapter {
    const key = field.key || "String";
    return this.validator(
      key,
      field,
      validator.isLength(field.value, { min: field.min, max: Infinity }),
      `${key} length need to be greater than ${field.min}`
    );
  }

  public isDateAfterOrEquals(
    field: ValidatorFields<Date> & { date: Date }
  ): ValidatorAdapter {
    return this.validator(
      "Date",
      field,
      !!field.value &&
        (field.value.toString() === field.date.toString() ||
          validator.isAfter(field.value.toString(), field.date.toString()))
    );
  }

  public isDateBeforeOrEquals(
    field: ValidatorFields<Date> & { date: Date }
  ): ValidatorAdapter {
    return this.validator(
      "Date",
      field,
      !!field.value &&
        (field.value.toString() === field.date.toString() ||
          validator.isBefore(field.value.toString(), field.date.toString()))
    );
  }

  private addValidationError(field: string, message: string): void {
    this.validationErrors.push({ field, message });
  }

  private generateMessage(context: string, message: string): string {
    return `${context}: ${message}`;
  }

  private validator<T>(
    key: string,
    field: ValidatorFields<T>,
    isOk: boolean,
    messageComplement: string = ""
  ): ValidatorAdapter {
    const messageKey = field.key || key;
    if (!isOk) {
      this.addValidationError(
        messageKey,
        this.generateMessage(
          field.context,
          `${messageKey} ${field.value} is invalid. ${messageComplement}`
        )
      );
    }
    return this;
  }
}
