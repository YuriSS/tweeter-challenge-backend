"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidationFactory = exports.UserValidation = void 0;
const dateRegistry_validation_1 = require("@shared/domain/validator/dateRegistry.validation");
class UserValidation {
    constructor(validator) {
        this.validator = validator;
    }
    configureValidation(fields, context) {
        this.validateIdentifier(fields, context)
            .validateUsername(fields, context)
            .validatePassword(fields, context);
        dateRegistry_validation_1.DateRegistryValidationFactory.create(this.validator).configureValidation(fields, context);
        return this.validator;
    }
    validateIdentifier(fields, context) {
        this.validator.isValidIdentifier({ value: fields.id, context });
        return this;
    }
    validateUsername(fields, context) {
        this.validator
            .minSringLength({ value: fields.username, min: 1, context })
            .maxStringLength({ value: fields.username, max: 15, context });
        return this;
    }
    validatePassword(fields, context) {
        this.validator
            .minSringLength({ value: fields.password, min: 5, context })
            .maxStringLength({ value: fields.password, max: 15, context });
        return this;
    }
}
exports.UserValidation = UserValidation;
class UserValidationFactory {
    static create(validator) {
        return new UserValidation(validator);
    }
}
exports.UserValidationFactory = UserValidationFactory;
