"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = void 0;
class ValidationError extends Error {
    constructor(errors, name) {
        super(errors.map((error) => error.message).join('\n'));
        this.errors = errors;
        this.name = name || "ValidationError";
    }
}
exports.ValidationError = ValidationError;
