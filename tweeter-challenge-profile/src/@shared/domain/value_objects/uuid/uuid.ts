import { ValueObject } from "@shared/domain/value_objects/value_object";

export interface UniqueId {
  id: string;
}

export class Identifier extends ValueObject<UniqueId> {
  public constructor(id: UniqueId) {
    super(id);
  }
}
