import { Validator } from "@shared/domain/validator/validator";

export interface EntityValidation<T> {
  configureValidation: (fields: T, context: string) => Validator;
}

