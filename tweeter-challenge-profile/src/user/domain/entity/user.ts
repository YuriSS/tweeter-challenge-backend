import { Entity } from "@shared/domain/entities/entity";
import { Validator } from "@shared/domain/validator/validator";
import { Identifier, MakeIdentifier } from "@shared/domain/value_objects/uuid/uuid";
import { UserEntityFields, UserEntityInput } from "@user/domain/entity/user.type";
import { UserValidationFactory } from "@user/domain/validation/user.validation";

export class UserEntity extends Entity<UserEntityInput, UserEntityFields> {
  public constructor(fields: UserEntityInput, protected validator: Validator, protected makeIdentifier: MakeIdentifier) {
    super(fields, validator, makeIdentifier, 'User');
  }

  public get username(): string {
    return this._fields.username;
  }

  public get password(): string {
    return this._fields.password;
  }

  public get profileId(): Identifier | undefined {
    return this._fields.profileId;
  }

  protected override mountFields(fields: UserEntityInput): UserEntityFields {
    return {
      id: fields.id || this.makeIdentifier.make(),
      username: fields.username,
      password: fields.password,
      profileId: fields.profileId,
      updatedAt: fields.updatedAt || new Date(),
      createdAt: fields.createdAt || new Date(),
    }
  }

  protected override configureValidation(): Validator {
    return UserValidationFactory.create(this.validator).configureValidation(this._fields, this.entityName);
  }
}
