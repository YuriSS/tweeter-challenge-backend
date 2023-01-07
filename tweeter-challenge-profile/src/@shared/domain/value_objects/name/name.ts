import { InvalidNameError } from "@shared/domain/errors/invalid_name.error";
import { ValueObject } from "@shared/domain/value_objects/value_object";

export class Name extends ValueObject<string> {

  private _name: string;

  public constructor(name: string) {
    super();
    this._name = name;
    this.validate();
  }

  public get value(): string {
    return this._name;
  }

  protected validate() {
    if (this._name === '') {
      throw new InvalidNameError();
    }
  }
}
