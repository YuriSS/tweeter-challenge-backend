import { Identifier } from "@shared/domain/value_objects/uuid/uuid";

export abstract class Entity<InputProps, Props> {
  private _id: Identifier;
  protected _fields: Props;

  public constructor(fields: InputProps, id: Identifier) {
    this._id = id;
    this._fields = this.mountFields(fields);
  }

  public get id(): Identifier {
    return this._id;
  }

  protected abstract mountFields(fields: InputProps): Props;

  public toJSON(): { id: string } & Props {
    return {
      id: this._id.value.id,
      ...this._fields,
    }
  }
}
