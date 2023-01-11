import { ValidationError } from "@shared/domain/errors/validation.error";

describe('ValidationError', () => {
  it('should construct an error', () => {
    const error = new ValidationError([{ message: 'test', field: '1' }, { message: 'other test', field: '2' }]);
    expect(error.name).toBe("ValidationError");
    expect(error.message).toBe('test\nother test');
  });
});
