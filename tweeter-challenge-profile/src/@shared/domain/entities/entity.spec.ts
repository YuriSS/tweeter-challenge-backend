import { Entity } from "@shared/domain/entities/entity";
import { createMock } from "ts-auto-mock";
import { Identifier } from "@shared/domain/value_objects/uuid/uuid";

describe('Entity', () => {
  it('should create entity with default inputs', () => {
    const testMock = createMock<{ testA: string }>();
    const id = new Identifier({ id: '1' }, { hasError: (): undefined => undefined });
    const testEntity = new TestEntity(testMock, id);

    expect(testEntity.id).toBeInstanceOf(Identifier);
    expect(testEntity.toJSON()).toEqual({
      id: id.value.id,
      testA: testMock.testA,
      testB: testEntity.defaultTestB,
    });
  });
});

interface TestProps {
  testA: string;
  testB?: string;
}
class TestEntity extends Entity<TestProps, Required<TestProps>> {
  public constructor(fields: TestProps, id: Identifier) {
    super(fields, id);
  }

  public get defaultTestB(): string {
    return 'default';
  }

  protected override mountFields(fields: TestProps): Required<TestProps> {
    return {
      testA: fields.testA,
      testB: fields.testB || this.defaultTestB,
    }
  }
}
