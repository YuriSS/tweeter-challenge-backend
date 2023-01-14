"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateRegistryValidationFactory = exports.DateRegistryValidation = void 0;
class DateRegistryValidation {
    constructor(validator) {
        this.validator = validator;
    }
    configureValidation(fields, context) {
        this.validateCreatedAt(fields, context).validateUpdatedAt(fields, context);
        return this.validator;
    }
    validateCreatedAt(fields, context) {
        this.validator.isDateBeforeOrEquals({ value: fields.createdAt, date: new Date(), context });
        return this;
    }
    validateUpdatedAt(fields, context) {
        this.validator
            .isDateAfterOrEquals({ value: fields.updatedAt, date: fields.createdAt, context })
            .isDateBeforeOrEquals({ value: fields.updatedAt, date: new Date(), context });
        return this;
    }
}
exports.DateRegistryValidation = DateRegistryValidation;
class DateRegistryValidationFactory {
    static create(validator) {
        return new DateRegistryValidation(validator);
    }
}
exports.DateRegistryValidationFactory = DateRegistryValidationFactory;
