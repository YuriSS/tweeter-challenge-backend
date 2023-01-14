"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileValidationFactory = exports.ProfileValidation = void 0;
const dateRegistry_validation_1 = require("@shared/domain/validator/dateRegistry.validation");
class ProfileValidation {
    constructor(validator) {
        this.validator = validator;
    }
    configureValidation(fields, context) {
        this.validateIdentifier(fields, context)
            .validateEmail(fields, context)
            .validateName(fields, context)
            .validateBiography(fields, context);
        dateRegistry_validation_1.DateRegistryValidationFactory.create(this.validator).configureValidation(fields, context);
        return this.validator;
    }
    validateIdentifier(fields, context) {
        this.validator.isValidIdentifier({ value: fields.id, context });
        return this;
    }
    validateEmail(fields, context) {
        this.validator.isValidEmail({ value: fields.email.value, context });
        return this;
    }
    validateName(fields, context) {
        this.validator
            .minSringLength({ value: fields.name.fullName, min: 1, context })
            .maxStringLength({ value: fields.name.fullName, max: 255, context });
        return this;
    }
    validateBiography(fields, context) {
        this.validator
            .maxStringLength({ value: fields.biography, max: 255, context });
        return this;
    }
}
exports.ProfileValidation = ProfileValidation;
class ProfileValidationFactory {
    static create(validator) {
        return new ProfileValidation(validator);
    }
}
exports.ProfileValidationFactory = ProfileValidationFactory;
