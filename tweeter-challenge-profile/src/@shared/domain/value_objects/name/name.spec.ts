import { ValidationError } from '@shared/domain/validation/validation';
import { Name, NameFields } from '@shared/domain/value_objects/name/name'

describe('Name', () => {
  it('should construct name as valid', () => {
    const nameMock: NameFields = { firstName: 'Jhon', lastName: 'Test' };
    const name = new Name(nameMock, { hasError: (): undefined => undefined });
    expect(name.value).toEqual({
      firstName: nameMock.firstName,
      lastName: nameMock.lastName,
    });
    expect(name.fullName).toBe(`${nameMock.firstName} ${nameMock.lastName}`);
  });

  it('should thrown a name error', () => {
    const nameMock: NameFields = { firstName: 'Jhon', lastName: 'Test' };
    expect(() => {
      new Name(nameMock, { hasError: (): ValidationError => ({ name: 'name', message: 'name error' }) });
    }).toThrow('name error');
  });
});
