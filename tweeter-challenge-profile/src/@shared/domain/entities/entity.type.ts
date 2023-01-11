import { Validator } from "@shared/domain/validation/validation";

export interface EntityValidation<T> {
  configureValidation: (fields: T, context: string) => Validator;
}

