import { ValueObject } from "@shared/domain/value_objects/value_object";

export interface UniqueId {
  id: string;
}

export interface MakeIdentifier {
  make: () => Identifier;
  create: (id: string) => Identifier;
}

export class Identifier extends ValueObject<UniqueId> {
  public constructor(id: UniqueId) {
    super(id);
  }
}

export const createFakeIdentifier = (seed: number = 1): MakeIdentifier => ({
  make: () => new Identifier({ id: `${seed++}e${Date.now()}` }),
  create: (id: string) => new Identifier({ id }),
});
