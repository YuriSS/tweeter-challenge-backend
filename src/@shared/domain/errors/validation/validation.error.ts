import { ValidationErrorFields } from "@shared/domain/validator/validator";

export class ValidationError extends Error {
  public constructor(public errors: ValidationErrorFields[], name?: string) {
    super();
    this.message = errors.map((error) => error.message).join(', ');
    this.name = name ||  "ValidationError";
  }
}
