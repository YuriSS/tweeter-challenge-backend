import { UUID } from "@shared/domain/value_objects/uuid/uuid";

export interface ProfileEntityFields {
  id: string;
  name: string;
  email: string;
  tweets?: string[];
}

export class ProfileEntity {
  public constructor(private _fields: ProfileEntityFields, private _id: UUID) {}

  public get id(): string {
    return this._id.value;
  }

  public get name(): string {
    return this._fields.name;
  }

  public get email(): string {
    return this._fields.email;
  }

  public get tweets(): string[] {
    return this._fields.tweets || [];
  }
}
