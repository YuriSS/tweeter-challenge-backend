"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
class NotFoundError extends Error {
    constructor(fields) {
        super();
        this.message = `${fields.field} with value ${fields.value} not found on ${fields.scope}`;
    }
}
exports.NotFoundError = NotFoundError;
