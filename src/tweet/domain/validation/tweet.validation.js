"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TweetValidationFactory = exports.TweetValidation = void 0;
const dateRegistry_validation_1 = require("@shared/domain/validator/dateRegistry.validation");
class TweetValidation {
    constructor(validator) {
        this.validator = validator;
    }
    configureValidation(fields, context) {
        this.validateIdentifier(fields, context)
            .validateParent(fields, context)
            .validateText(fields, context);
        dateRegistry_validation_1.DateRegistryValidationFactory.create(this.validator).configureValidation(fields, context);
        return this.validator;
    }
    validateIdentifier(fields, context) {
        this.validator.isValidIdentifier({ value: fields.id, context });
        return this;
    }
    validateText(fields, context) {
        this.validator
            .minSringLength({ value: fields.text, min: 1, context })
            .maxStringLength({ value: fields.text, max: 255, context });
        return this;
    }
    validateParent(fields, context) {
        if (!fields.parent)
            return this;
        this.validator.isValidIdentifier({ value: fields.parent, context });
        return this;
    }
}
exports.TweetValidation = TweetValidation;
class TweetValidationFactory {
    static create(validator) {
        return new TweetValidation(validator);
    }
}
exports.TweetValidationFactory = TweetValidationFactory;
