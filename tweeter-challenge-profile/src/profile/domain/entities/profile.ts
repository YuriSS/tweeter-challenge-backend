import { Entity } from "@shared/domain/entities/entity";
import { Identifier } from "@shared/domain/value_objects/uuid/uuid";

export interface ProfileEntityFields {
  name: string;
  email: string;
  bio?: string;
  tweets?: Identifier[];
}

export class ProfileEntity extends Entity<ProfileEntityFields, Required<ProfileEntityFields>> {
  public constructor(fields: ProfileEntityFields, id: Identifier ) {
    super(fields, id);
  }

  public get name(): string {
    return this._fields.name;
  }

  public get email(): string {
    return this._fields.email;
  }

  public get bio(): string {
    return this._fields.bio;
  }

  public get tweets(): Identifier[] {
    return this._fields.tweets;
  }

  protected override mountFields(fields: ProfileEntityFields): Required<ProfileEntityFields> {
    return {
      name: fields.name,
      email: fields.email,
      bio: fields.bio || '',
      tweets: fields.tweets || []
    }
  }
}
