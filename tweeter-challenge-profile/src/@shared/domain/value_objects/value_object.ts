import { deepFreeze } from "@shared/domain/helpers/object";
import { Validation } from "@shared/domain/validation/validation";
import { ValidationError } from "@shared/domain/errors/validation.error";

export abstract class ValueObject<T> {
  private _value;

  public constructor(value: T, validation: Validation<T>) {
    const error = validation.hasError(value);
    if (error) {
      throw new ValidationError(error);
    }
    this._value = deepFreeze(value);
  }

  public get value(): T {
    return this._value;
  }
}
