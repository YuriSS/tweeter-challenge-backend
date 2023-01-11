import { Validator } from "@shared/domain/validation/validation";

export interface EntityValidation<T> {
  validate: (fields: T, context: string) => Validator;
}

