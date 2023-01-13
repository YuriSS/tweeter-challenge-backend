import { createMock } from "ts-auto-mock";
import { DateRegistryFields, DateRegistryValidationFactory } from "./dateRegistry.validation";
import { createFakeValidator } from "./validator";

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
    const dateRegistryFieldsMock = createMock<DateRegistryFields>({
      updatedAt: new Date(date.getTime() - 1000 * 60 * 60),
      createdAt: new Date(date.getTime() - 1000 * 60 * 60 * 24)
    });
    const validator = createFakeValidator();
    const isDateAfterOrEqualsSpy = jest.spyOn(validator, 'isDateAfterOrEquals');
    const isDateBeforeOrEqualsSpy = jest.spyOn(validator, 'isDateBeforeOrEquals');

    DateRegistryValidationFactory.create(validator).configureValidation(dateRegistryFieldsMock, context);

    expect(isDateAfterOrEqualsSpy).toHaveBeenCalledTimes(1);
    expect(isDateAfterOrEqualsSpy).toHaveBeenCalledWith({ value: dateRegistryFieldsMock.updatedAt, date: dateRegistryFieldsMock.createdAt, context });

    expect(isDateBeforeOrEqualsSpy).toHaveBeenCalledTimes(2);
    expect(isDateBeforeOrEqualsSpy.mock.calls).toEqual([
      [{ value: dateRegistryFieldsMock.createdAt, date, context }],
      [{ value: dateRegistryFieldsMock.updatedAt, date, context }]
    ]);
  });
});
