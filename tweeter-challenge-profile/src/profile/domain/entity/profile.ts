import { Entity } from "@shared/domain/entities/entity";
import { Identifier, MakeIdentifier } from "@shared/domain/value_objects/uuid/uuid";
import { ProfileEntityFields, ProfileEntityInput } from "@profile/domain/entity/profile.type";
import { Validator } from "@shared/domain/validator/validator";
import { ProfileValidationFactory } from "@profile/domain/validation/profile.validation";
import { Name } from "@shared/domain/value_objects/name/name";
import { Email } from "@shared/domain/value_objects/email/email";

export class ProfileEntity extends Entity<ProfileEntityInput, ProfileEntityFields> {
  public constructor(fields: ProfileEntityInput, protected validator: Validator, protected makeIdentifier: MakeIdentifier) {
    super(fields, validator, makeIdentifier, 'Profile');
  }

  public get userId(): Identifier {
    return this._fields.userId;
  }

  public get name(): Name {
    return this._fields.name;
  }

  public get email(): Email {
    return this._fields.email;
  }

  public get biography(): string {
    return this._fields.biography;
  }

  protected override mountFields(fields: ProfileEntityInput): ProfileEntityFields {
    return {
      id: fields.id || this.makeIdentifier.make(),
      userId: fields.userId,
      name: fields.name,
      email: fields.email,
      biography: fields.biography || "",
      updatedAt: fields.updatedAt || new Date(),
      createdAt: fields.createdAt || new Date(),
    }
  }

  protected override configureValidation(): Validator {
    return ProfileValidationFactory.create(this.validator).configureValidation(this._fields, this.entityName);
  }
}
