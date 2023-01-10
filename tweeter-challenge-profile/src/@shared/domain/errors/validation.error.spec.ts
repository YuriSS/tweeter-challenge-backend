import { ValidationError } from "@shared/domain/errors/validation.error";

describe('ValidationError', () => {
  it('should construct an error', () => {
    const error = new ValidationError();
    expect(error.name).toBe("ValidationError");
    expect(error.message).toBe("Validation error");
  });
});
