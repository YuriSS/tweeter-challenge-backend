import { Identifier } from "@shared/domain/value_objects/uuid/uuid";
import { Validator } from "@shared/domain/validator/validator";
import { ValidationError } from "@shared/domain/errors/validation.error";

export abstract class Entity<InputProps extends { id: Identifier }, Props extends { id: Identifier }> {
  protected _fields: Props;

  public constructor(fields: InputProps, protected validator: Validator, protected entityName: string) {
    this._fields = this.mountFields(fields);
    const errors = this.configureValidation().validate();
    if (errors.length) {
      throw new ValidationError(errors, this.entityName);
    }
  }

  public get id(): Identifier {
    return this._fields.id;
  }

  public toJSON(): Props {
    return {
      ...this._fields,
    }
  }

  protected abstract mountFields(fields: InputProps): Props;

  protected abstract configureValidation(): Validator;
}
