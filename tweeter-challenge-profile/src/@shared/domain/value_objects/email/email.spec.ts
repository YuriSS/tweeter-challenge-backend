import { InvalidEmailError } from '@shared/domain/errors/invalid_email.error';
import { Email } from '@shared/domain/value_objects/email/email'

describe('Email', () => {
  it('should construct email as valid', () => {
    const emailString = 'test@test.br';
    const email = new Email(emailString);
    expect(email.value).toBe(emailString);
  });

  it('should throw an invalid email error', () => {
    const emailString = 'test@test.';
    expect(() => new Email(emailString)).toThrow(InvalidEmailError);
  });
});
