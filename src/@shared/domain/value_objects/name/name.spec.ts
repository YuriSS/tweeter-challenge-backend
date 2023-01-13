import { Name, NameFields } from '@shared/domain/value_objects/name/name'

describe('Name', () => {
  it('should construct name as valid', () => {
    const nameMock: NameFields = { firstName: 'Jhon', lastName: 'Test' };
    const name = new Name(nameMock);
    expect(name.value).toEqual({
      firstName: nameMock.firstName,
      lastName: nameMock.lastName,
    });
    expect(name.fullName).toBe(`${nameMock.firstName} ${nameMock.lastName}`);
  });
});
