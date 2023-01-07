import { InvalidUUIDError } from "@shared/domain/errors/invalid_uuid.error";
import { v4 as uuidv4, validate as uuidValidate } from "uuid"

export class UUID {
  private _id: string;

  public constructor(id?: string) {
    this._id = id || uuidv4();
    this.validate();
  }

  public get value(): string {
    return this._id;
  }

  private validate() {
    if (!uuidValidate(this._id)) {
      throw new InvalidUUIDError();
    }
  }
}
