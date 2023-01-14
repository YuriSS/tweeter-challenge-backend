import { MakeIdentifier, Identifier } from "@shared/domain/value_objects/uuid/uuid";
import { v4 as uuidV4 } from "uuid"

export class MakeIdentifierImpl implements MakeIdentifier {
  make(): Identifier {
    return new Identifier({ id: uuidV4() });
  }

  create(id: string): Identifier {
    return new Identifier({ id });
  }
}
