import { Email } from '@shared/domain/value_objects/email/email'

describe('Email', () => {
  it('should construct email as valid', () => {
    const emailString = 'test@domain.br';
    const email = new Email(emailString);
    expect(email.value).toBe(emailString);
    expect(email.domain).toBe('domain.br');
    expect(email.emailInfo).toEqual({
      username: 'test',
      domain: 'domain.br'
    });
  });
});
