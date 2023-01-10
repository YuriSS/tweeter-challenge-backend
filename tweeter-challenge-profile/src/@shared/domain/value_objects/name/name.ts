import { Validation } from "@shared/domain/validation/validation";
import { ValueObject } from "@shared/domain/value_objects/value_object";

export interface NameFields {
  firstName: string;
  lastName: string;
}

export class Name extends ValueObject<NameFields> {
  public constructor(fields: NameFields, validation: Validation<NameFields>) {
    super(fields, validation);
  }

  public get firstName(): string {
    return this.value.firstName;
  }

  public get lastName(): string {
    return this.value.lastName;
  }

  public get fullName(): string {
    return `${this.firstName} ${this.lastName}`.trim();
  }
}
