import { InvalidUUIDError } from "@shared/domain/errors/invalid_uuid.error";
import { v4 as uuidv4, validate as uuidValidate } from "uuid"
import { ValueObject } from "../value_object";

export class UUID extends ValueObject<string> {
  private _id: string;

  public constructor(id?: string) {
    super();
    this._id = id || uuidv4();
    this.validate();
  }

  public get value(): string {
    return this._id;
  }

  protected validate() {
    if (!uuidValidate(this._id)) {
      throw new InvalidUUIDError();
    }
  }
}
