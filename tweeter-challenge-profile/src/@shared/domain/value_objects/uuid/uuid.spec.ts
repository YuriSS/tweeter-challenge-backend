import { ValidationError } from "@shared/domain/validation/validation";
import { Identifier, UniqueId } from "@shared/domain/value_objects/uuid/uuid"
import { createMock } from "ts-auto-mock";

describe("Id", () => {
  it("should construct id", () => {
    const uniqueIdMock = createMock<UniqueId>();
    const id = new Identifier(uniqueIdMock, { hasError: (): undefined => undefined });
    expect(id.value.id).toBe(uniqueIdMock.id);
  });

  it("should thrown an id error", () => {
    const uniqueIdMock = createMock<UniqueId>();
    expect(() => {
      new Identifier(uniqueIdMock, { hasError: (): ValidationError => ({ name: 'id', message: 'id error'}) });
    }).toThrow('id error')
  });
});
