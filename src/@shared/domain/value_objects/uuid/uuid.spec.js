"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("@shared/domain/value_objects/uuid/uuid");
const ts_auto_mock_1 = require("ts-auto-mock");
describe("Id", () => {
    const date = new Date();
    beforeEach(() => {
        jest.useFakeTimers().setSystemTime(date);
    });
    afterEach(() => {
        jest.useRealTimers();
    });
    it("should construct id", () => {
        const uniqueIdMock = (0, ts_auto_mock_1.createMock)();
        const id = new uuid_1.Identifier(uniqueIdMock);
        expect(id.value.id).toBe(uniqueIdMock.id);
    });
    it("should create a fake Identifier", () => {
        const faker = (0, uuid_1.createFakeIdentifier)();
        expect(faker.make()).toEqual(new uuid_1.Identifier({ id: `1e${date.getTime()}` }));
    });
    it("should create a fake Identifier with start", () => {
        const faker = (0, uuid_1.createFakeIdentifier)(5);
        expect(faker.make()).toEqual(new uuid_1.Identifier({ id: `5e${date.getTime()}` }));
    });
});
