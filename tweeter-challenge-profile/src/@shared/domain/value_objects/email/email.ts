import { InvalidEmailError } from "@shared/domain/errors/invalid_email.error";
import { ValueObject } from "@shared/domain/value_objects/value_object";

export class Email extends ValueObject<string> {

  private validationRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  private _email: string;

  public constructor(email: string) {
    super();
    this._email = email;
    this.validate();
  }

  public get value(): string {
    return this._email;
  }

  protected validate() {
    if (!this.validationRegex.test(this._email)) {
      throw new InvalidEmailError();
    }
  }
}
