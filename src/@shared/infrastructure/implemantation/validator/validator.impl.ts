import { Validator, ValidatorFields, ValidationErrorFields } from "@shared/domain/validator/validator";
import { Identifier } from "@shared/domain/value_objects/uuid/uuid";
import validator from 'validator'

export class ValidatorImpl implements Validator {
  private validationErrors: ValidationErrorFields[] = [];

  public validate(): ValidationErrorFields[] {
    return this.validationErrors;
  }

  public isValidEmail(field: ValidatorFields<string>): ValidatorImpl {
    return this.validator('Email', field, validator.isEmail(field.value))
  }

  public isValidIdentifier(field: ValidatorFields<Identifier>): ValidatorImpl {
    return this.validator('Id', field, validator.isUUID(field.value.value.id))
  }

  public isEmptyString(_: ValidatorFields<string>): ValidatorImpl {
    throw new Error("Not implemented yet");
  }

  public maxStringLength(field: ValidatorFields<string> & { max: number }): ValidatorImpl {
    return this.validator('String', field, validator.isLength(field.value, { max: field.max }))
  }

  public minSringLength(field: ValidatorFields<string> & { min: number }): ValidatorImpl {
    return this.validator('String', field, validator.isLength(field.value, { min: field.min }))
  }

  public isDateAfterOrEquals(field: ValidatorFields<Date> & { date: Date }): ValidatorImpl {
    return this.validator(
      'Date',
      field,
      field.value.toString() === field.date.toString()
        || validator.isAfter(field.value.toString(), field.date.toString())
    )
  }

  public isDateBeforeOrEquals(field: ValidatorFields<Date> & { date: Date }): ValidatorImpl {
    return this.validator(
      'Date',
      field,
      field.value.toString() === field.date.toString()
        || validator.isBefore(field.value.toString(), field.date.toString())
    )
  }

  private addValidationError(field: string, message: string): void {
    this.validationErrors.push({ field, message });
  }

  private generateMessage(context: string, message: string): string {
    return `${context}: ${message}`;
  }

  private validator<T>(key: string, field: ValidatorFields<T>, isOk: boolean): ValidatorImpl {
    const messageKey = field.key || key;
    if (!isOk) {
      this.addValidationError(messageKey, this.generateMessage(field.context, `${messageKey} ${field.value} is invalid`));
    }
    return this;
  }
}
