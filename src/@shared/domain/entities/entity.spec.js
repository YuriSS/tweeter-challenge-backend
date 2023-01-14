"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entity_1 = require("@shared/domain/entities/entity");
const ts_auto_mock_1 = require("ts-auto-mock");
const uuid_1 = require("@shared/domain/value_objects/uuid/uuid");
const validator_1 = require("@shared/domain/validator/validator");
describe('Entity', () => {
    const date = new Date();
    beforeEach(() => {
        jest.useFakeTimers().setSystemTime(date);
    });
    afterEach(() => {
        jest.useRealTimers();
    });
    it('should create entity with default inputs', () => {
        const testMock = (0, ts_auto_mock_1.createMock)();
        const validator = (0, validator_1.createFakeValidator)();
        const validateSpy = jest.spyOn(validator, 'validate');
        const testEntity = new TestEntity(testMock, validator);
        expect(validateSpy).toHaveBeenCalledTimes(1);
        expect(testEntity.id).toEqual(testMock.id);
        expect(testEntity.toJSON()).toEqual({
            id: testMock.id,
            testA: testMock.testA,
            testB: testEntity.defaultTestB,
            createdAt: date,
            updatedAt: date
        });
    });
    it('should create entity and throw a validation error', () => {
        const testMock = (0, ts_auto_mock_1.createMock)();
        const validator = (0, validator_1.createFakeValidator)([{ field: 'testA', message: 'testA is not valid' }]);
        expect(() => { new TestEntity(testMock, validator); }).toThrow('testA is not valid');
    });
});
class TestEntity extends entity_1.Entity {
    constructor(fields, validator) {
        super(fields, validator, (0, uuid_1.createFakeIdentifier)(), 'Test');
        this.validator = validator;
    }
    get defaultTestB() {
        return 'default';
    }
    mountFields(fields) {
        return {
            id: fields.id,
            testA: fields.testA,
            testB: fields.testB || this.defaultTestB,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    }
    configureValidation() {
        return this.validator;
    }
}
