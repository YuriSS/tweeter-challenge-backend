"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validation_error_1 = require("@shared/domain/errors/validation.error");
describe('ValidationError', () => {
    it('should construct an error', () => {
        const error = new validation_error_1.ValidationError([{ message: 'test', field: '1' }, { message: 'other test', field: '2' }]);
        expect(error.name).toBe("ValidationError");
        expect(error.message).toBe('test\nother test');
    });
});
