import { ValidationError } from '@shared/domain/validation/validation';
import { Email } from '@shared/domain/value_objects/email/email'

describe('Email', () => {
  it('should construct email as valid', () => {
    const emailString = 'test@domain.br';
    const email = new Email(emailString, { hasError: (_: string): undefined => undefined });
    expect(email.value).toBe(emailString);
    expect(email.domain).toBe('domain.br');
    expect(email.emailInfo).toEqual({
      username: 'test',
      domain: 'domain.br'
    });
  });

  it('should thown an email error', () => {
    const emailString = '';
    expect(() => {
      new Email(emailString, { hasError: (_: string): ValidationError  => ({ name: 'email', message: 'email message' })});
    }).toThrow('email message');
  });
});
