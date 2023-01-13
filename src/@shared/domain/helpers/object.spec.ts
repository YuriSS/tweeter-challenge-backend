import { deepFreeze } from "./object";

describe('object utils', () => {
  it('should be a immutable value', () => {
    const test = deepFreeze({
      key1: { insideKey1: { innerKey: 3 } }
    });

    expect(() => test.key1.insideKey1.innerKey = 5).toThrow("Cannot assign to read only property 'innerKey' of object '#<Object>'");
  });
});
