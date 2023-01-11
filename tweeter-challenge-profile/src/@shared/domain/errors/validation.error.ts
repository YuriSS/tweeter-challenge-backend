import { ValidationErrorFields } from "@shared/domain/validator/validator";

export class ValidationError extends Error {
  public constructor(public errors: ValidationErrorFields[], name?: string) {
    super(errors.map((error) => error.message).join('\n'));
    this.name = name ||  "ValidationError";
  }
}
