import { Email } from "@shared/domain/value_objects/email/email";
import { Name } from "@shared/domain/value_objects/name/name";
import { UUID } from "@shared/domain/value_objects/uuid/uuid";

export interface ProfileEntityFields {
  id: string;
  name: Name;
  email: Email;
  tweets?: string[];
}

export class ProfileEntity {
  public constructor(private _fields: ProfileEntityFields, private _id: UUID) {}

  public get id(): string {
    return this._id.value;
  }

  public get name(): string {
    return this._fields.name.value;
  }

  public get email(): string {
    return this._fields.email.value;
  }

  public get tweets(): string[] {
    return this._fields.tweets || [];
  }
}
