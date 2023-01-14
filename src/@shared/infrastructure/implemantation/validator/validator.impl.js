"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatorImpl = void 0;
const validator_1 = __importDefault(require("validator"));
class ValidatorImpl {
    constructor() {
        this.validationErrors = [];
    }
    validate() {
        return this.validationErrors;
    }
    isValidEmail(field) {
        return this.validator('Email', field, validator_1.default.isEmail(field.value));
    }
    isValidIdentifier(field) {
        return this.validator('Id', field, validator_1.default.isUUID(field.value.value.id));
    }
    isEmptyString(_) {
        throw new Error("Not implemented yet");
    }
    maxStringLength(field) {
        return this.validator('String', field, validator_1.default.isLength(field.value, { max: field.max }));
    }
    minSringLength(field) {
        return this.validator('String', field, validator_1.default.isLength(field.value, { min: field.min }));
    }
    isDateAfterOrEquals(field) {
        return this.validator('Date', field, field.value.toString() === field.date.toString()
            || validator_1.default.isAfter(field.value.toString(), field.date.toString()));
    }
    isDateBeforeOrEquals(field) {
        return this.validator('Date', field, field.value.toString() === field.date.toString()
            || validator_1.default.isBefore(field.value.toString(), field.date.toString()));
    }
    addValidationError(field, message) {
        this.validationErrors.push({ field, message });
    }
    generateMessage(context, message) {
        return `${context}: ${message}`;
    }
    validator(key, field, isOk) {
        const messageKey = field.key || key;
        if (!isOk) {
            this.addValidationError(messageKey, this.generateMessage(field.context, `${messageKey} ${field.value} is invalid`));
        }
        return this;
    }
}
exports.ValidatorImpl = ValidatorImpl;
