"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_auto_mock_1 = require("ts-auto-mock");
const dateRegistry_validation_1 = require("./dateRegistry.validation");
const validator_1 = require("./validator");
describe("DateRegistryValidation", () => {
    const date = new Date();
    const context = 'Date';
    beforeEach(() => {
        jest.useFakeTimers().setSystemTime(date);
    });
    afterEach(() => {
        jest.useRealTimers();
    });
    it("should validate createdAt and updatedAt", () => {
        const dateRegistryFieldsMock = (0, ts_auto_mock_1.createMock)({
            updatedAt: new Date(date.getTime() - 1000 * 60 * 60),
            createdAt: new Date(date.getTime() - 1000 * 60 * 60 * 24)
        });
        const validator = (0, validator_1.createFakeValidator)();
        const isDateAfterOrEqualsSpy = jest.spyOn(validator, 'isDateAfterOrEquals');
        const isDateBeforeOrEqualsSpy = jest.spyOn(validator, 'isDateBeforeOrEquals');
        dateRegistry_validation_1.DateRegistryValidationFactory.create(validator).configureValidation(dateRegistryFieldsMock, context);
        expect(isDateAfterOrEqualsSpy).toHaveBeenCalledTimes(1);
        expect(isDateAfterOrEqualsSpy).toHaveBeenCalledWith({ value: dateRegistryFieldsMock.updatedAt, date: dateRegistryFieldsMock.createdAt, context });
        expect(isDateBeforeOrEqualsSpy).toHaveBeenCalledTimes(2);
        expect(isDateBeforeOrEqualsSpy.mock.calls).toEqual([
            [{ value: dateRegistryFieldsMock.createdAt, date, context }],
            [{ value: dateRegistryFieldsMock.updatedAt, date, context }]
        ]);
    });
});
