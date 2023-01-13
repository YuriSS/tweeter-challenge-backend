import { createFakeValidator, ValidationErrorFields, ValidatorFields } from "@shared/domain/validator/validator";
import { createMock, createMockList } from "ts-auto-mock";
import { Identifier } from "@shared/domain/value_objects/uuid/uuid";

describe("Validation", () => {
  it("should createFakeValidator", () => {
    const mockResult = createMockList<ValidationErrorFields>(3);
    const validator = createFakeValidator();
    const validatorWithResult = createFakeValidator(mockResult);

    expect(validator.isValidIdentifier(createMock<ValidatorFields<Identifier>>())).toBe(validator),
    expect(validator.isValidEmail(createMock<ValidatorFields<string>>())).toBe(validator),
    expect(validator.isEmptyString(createMock<ValidatorFields<string>>())).toBe(validator),
    expect(validator.maxStringLength(createMock<ValidatorFields<string> & { max: number }>())).toBe(validator),
    expect(validator.minSringLength(createMock<ValidatorFields<string> & { min: number }>())).toBe(validator),
    expect(validator.isDateAfterOrEquals(createMock<ValidatorFields<Date> & { date: Date }>())).toBe(validator),
    expect(validator.isDateBeforeOrEquals(createMock<ValidatorFields<Date> & { date: Date }>())).toBe(validator),
    expect(validator.validate()).toEqual([]);
    expect(validatorWithResult.validate()).toEqual(mockResult);
  });
});
