import { Identifier } from "@shared/domain/value_objects/uuid/uuid";

export interface ValidationErrorFields {
  field: string;
  message: string;
}

export interface ValidatorFields<T> {
  value: T;
  context: string;
  key?: string;
}

export interface Validator {
  isValidIdentifier: (properties: ValidatorFields<Identifier>) => Validator;
  isValidEmail: (properties: ValidatorFields<string>) => Validator;
  isEmptyString: (properties: ValidatorFields<string>) => Validator;
  maxStringLength: (properties: ValidatorFields<string> & { max: number }) => Validator;
  minSringLength: (properties: ValidatorFields<string> & { min: number }) => Validator;
  isDateAfterOrEquals: (properties: ValidatorFields<Date> & { date: Date }) => Validator;
  isDateBeforeOrEquals: (properties: ValidatorFields<Date> & { date: Date }) => Validator;
  validate: () => ValidationErrorFields[]
}

export const createFakeValidator = (validateResult: ValidationErrorFields[] = []): Validator => {
  const validator: Validator = {
    isValidIdentifier: (_: ValidatorFields<Identifier>) => validator,
    isValidEmail: (_: ValidatorFields<string>) => validator,
    isEmptyString: (_: ValidatorFields<string>) => validator,
    maxStringLength: (_: ValidatorFields<string> & { max: number }) => validator,
    minSringLength: (_: ValidatorFields<string> & { min: number }) => validator,
    isDateAfterOrEquals: (_: ValidatorFields<Date> & { date: Date }) => validator,
    isDateBeforeOrEquals: (_: ValidatorFields<Date> & { date: Date }) => validator,
    validate: (): ValidationErrorFields[] => validateResult,
  };
  return validator;
}
