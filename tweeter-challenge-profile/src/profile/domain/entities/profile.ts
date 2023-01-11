import { Entity } from "@shared/domain/entities/entity";
import { Identifier } from "@shared/domain/value_objects/uuid/uuid";
import { ProfileEntityFields, ProfileEntityInput } from "@profile/domain/entities/profile.type";
import { Validator } from "@shared/domain/validation/validation";
import { ProfileValidationFactory } from "@profile/domain/entities/profile.validation";

export class ProfileEntity extends Entity<ProfileEntityInput, ProfileEntityFields> {
  public constructor(fields: ProfileEntityInput, protected validator: Validator) {
    super(fields, validator, 'Profile');
  }

  public get user(): Identifier {
    return this._fields.user;
  }

  public get name(): string {
    return this._fields.name;
  }

  public get email(): string {
    return this._fields.email;
  }

  public get biography(): string {
    return this._fields.biography;
  }

  public get tweets(): Identifier[] {
    return this._fields.tweets;
  }

  protected override mountFields(fields: ProfileEntityInput): Required<ProfileEntityInput> {
    return {
      id: fields.id,
      user: fields.user,
      name: fields.name,
      email: fields.email,
      biography: fields.biography || '',
      tweets: fields.tweets || []
    }
  }

  protected override configureValidation(): Validator {
    return ProfileValidationFactory.create(this.validator).validate(this._fields, this.entityName);
  }
}
