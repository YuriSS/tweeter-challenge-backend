export class ValidationError extends Error {
  public constructor(validationError?: ValidationError) {
    super(validationError?.message || "Validation error");
    this.name = validationError?.name || "ValidationError";
  }
}
