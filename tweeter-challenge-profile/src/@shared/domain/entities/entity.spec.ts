import { Entity } from "@shared/domain/entities/entity";
import { createMock } from "ts-auto-mock";
import { Identifier } from "@shared/domain/value_objects/uuid/uuid";
import { createFakeValidator, Validator } from "../validation/validation";

describe('Entity', () => {
  it('should create entity with default inputs', () => {
    const testMock = createMock<TestProps>();
    const validator = createFakeValidator();
    const validateSpy = jest.spyOn(validator, 'validate');
    const testEntity = new TestEntity(testMock, validator);

    expect(validateSpy).toHaveBeenCalledTimes(1);
    expect(testEntity.id).toEqual(testMock.id);
    expect(testEntity.toJSON()).toEqual({
      id: testMock.id,
      testA: testMock.testA,
      testB: testEntity.defaultTestB,
    });
  });

  it('should create entity and throw a validation error', () => {
    const testMock = createMock<TestProps>();
    const validator = createFakeValidator([{ field: 'testA', message: 'testA is not valid' }]);
    
    expect(() => { new TestEntity(testMock, validator) }).toThrow('testA is not valid');
  });
});

interface TestProps {
  id: Identifier;
  testA: string;
  testB?: string;
}
class TestEntity extends Entity<TestProps, Required<TestProps>> {
  public constructor(fields: TestProps, protected validator: Validator) {
    super(fields, validator, 'Test');
  }

  public get defaultTestB(): string {
    return 'default';
  }

  protected override mountFields(fields: TestProps): Required<TestProps> {
    return {
      id: fields.id,
      testA: fields.testA,
      testB: fields.testB || this.defaultTestB,
    }
  }

  protected override configureValidation(): Validator {
    return this.validator;
  }
}
