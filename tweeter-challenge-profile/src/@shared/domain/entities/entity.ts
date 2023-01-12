import { Identifier, MakeIdentifier } from "@shared/domain/value_objects/uuid/uuid";
import { Validator } from "@shared/domain/validator/validator";
import { ValidationError } from "@shared/domain/errors/validation.error";

export interface EntityFields {
  id?: Identifier;
  createdAt?: Date;
  updatedAt?: Date;
}

export abstract class Entity<InputProps extends EntityFields, Props extends Required<EntityFields>> {
  protected _fields: Props;

  public constructor(fields: InputProps, protected validator: Validator, protected makeIdentifier: MakeIdentifier, protected entityName: string) {
    this._fields = this.mountFields(fields);
    const errors = this.configureValidation().validate();
    if (errors.length) {
      throw new ValidationError(errors, this.entityName);
    }
  }

  public get id(): Identifier {
    return this._fields.id;
  }

  public get createdAt(): Date {
    return this._fields.createdAt;
  }

  public get updatedAt(): Date {
    return this._fields.updatedAt;
  }

   public toJSON(): Props {
    return {
      ...this._fields,
    }
  }

  protected abstract mountFields(fields: InputProps): Props;

  protected abstract configureValidation(): Validator;
}
