import { createFakeIdentifier, Identifier, UniqueId } from "@shared/domain/value_objects/uuid/uuid"
import { createMock } from "ts-auto-mock";

describe("Id", () => {
  const date = new Date();

  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(date);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should construct id", () => {
    const uniqueIdMock = createMock<UniqueId>();
    const id = new Identifier(uniqueIdMock);
    expect(id.value.id).toBe(uniqueIdMock.id);
  });

  it("should create a fake Identifier", () => {
    const faker = createFakeIdentifier();

    expect(faker.make()).toEqual(new Identifier({ id: `1e${date.getTime()}` }));
  });

  it("should create a fake Identifier with start", () => {
    const faker = createFakeIdentifier(5);

    expect(faker.make()).toEqual(new Identifier({ id: `5e${date.getTime()}` }));
  });
});
