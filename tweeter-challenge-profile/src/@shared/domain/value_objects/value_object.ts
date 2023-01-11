import { deepFreeze } from "@shared/domain/helpers/object";

export abstract class ValueObject<T> {
  private _value;

  public constructor(value: T) {
    this._value = deepFreeze(value);
  }

  public get value(): T {
    return this._value;
  }
}
