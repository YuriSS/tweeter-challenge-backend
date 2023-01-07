import { InvalidNameError } from '@shared/domain/errors/invalid_name.error';
import { Name } from '@shared/domain/value_objects/name/name'

describe('Name', () => {
  it('should construct name as valid', () => {
    const nameString = 'Test Name';
    const name = new Name(nameString);
    expect(name.value).toBe(nameString);
  });

  it('should throw an invalid name error', () => {
    const nameString = '';
    expect(() => new Name(nameString)).toThrow(InvalidNameError);
  });
});
