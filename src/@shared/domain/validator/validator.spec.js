"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = require("@shared/domain/validator/validator");
const ts_auto_mock_1 = require("ts-auto-mock");
describe("Validation", () => {
    it("should createFakeValidator", () => {
        const mockResult = (0, ts_auto_mock_1.createMockList)(3);
        const validator = (0, validator_1.createFakeValidator)();
        const validatorWithResult = (0, validator_1.createFakeValidator)(mockResult);
        expect(validator.isValidIdentifier((0, ts_auto_mock_1.createMock)())).toBe(validator),
            expect(validator.isValidEmail((0, ts_auto_mock_1.createMock)())).toBe(validator),
            expect(validator.isEmptyString((0, ts_auto_mock_1.createMock)())).toBe(validator),
            expect(validator.maxStringLength((0, ts_auto_mock_1.createMock)())).toBe(validator),
            expect(validator.minSringLength((0, ts_auto_mock_1.createMock)())).toBe(validator),
            expect(validator.isDateAfterOrEquals((0, ts_auto_mock_1.createMock)())).toBe(validator),
            expect(validator.isDateBeforeOrEquals((0, ts_auto_mock_1.createMock)())).toBe(validator),
            expect(validator.validate()).toEqual([]);
        expect(validatorWithResult.validate()).toEqual(mockResult);
    });
});
