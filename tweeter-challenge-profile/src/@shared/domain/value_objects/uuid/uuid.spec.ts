import { Identifier, UniqueId } from "@shared/domain/value_objects/uuid/uuid"
import { createMock } from "ts-auto-mock";

describe("Id", () => {
  it("should construct id", () => {
    const uniqueIdMock = createMock<UniqueId>();
    const id = new Identifier(uniqueIdMock);
    expect(id.value.id).toBe(uniqueIdMock.id);
  });
});
