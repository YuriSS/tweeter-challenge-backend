import { InvalidUUIDError } from "@shared/domain/errors/invalid_uuid.error";
import { UUID } from "@shared/domain/value_objects/uuid/uuid"
import { v4 } from "uuid";

describe("UUID", () => {
  it("should construct uuid without parameter", () => {
    const uuid = new UUID();
    expect(uuid.value).toBeTruthy();
  });

  it("should construct passing an uuid", () => {
    const id = v4();
    const uuid = new UUID(id);
    expect(uuid.value).toBe(id);
  });

  it("should throw an erro when passing an invalid uuid", () => {
    expect(() => new UUID('invalid')).toThrow(InvalidUUIDError);
  });
});
