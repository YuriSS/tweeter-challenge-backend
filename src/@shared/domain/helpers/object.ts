export const deepFreeze = <T>(value: T): T => {
  if (value && typeof value === 'object') {
    Object.getOwnPropertyNames(value).forEach((key) => {
      deepFreeze(value[key as keyof T]);
    });
  }
  return Object.freeze(value);
}
