import { ValidationError } from '@shared/domain/validation/validation';
import { Email } from '@shared/domain/value_objects/email/email'

describe('Email', () => {
  it('should construct email as valid', () => {
    const emailString = 'test@test.br';
    const email = new Email(emailString, { hasError: (_: string): undefined => undefined });
    expect(email.value).toBe(emailString);
  });

  it('should thown an email error', () => {
    const emailString = '';
    expect(() => {
      new Email(emailString, { hasError: (_: string): ValidationError  => ({ name: 'email', message: 'email message' })});
    }).toThrow('email message');
  });
});
