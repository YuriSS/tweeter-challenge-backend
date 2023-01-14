"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
const validation_error_1 = require("@shared/domain/errors/validation.error");
class Entity {
    constructor(fields, validator, makeIdentifier, entityName) {
        this.validator = validator;
        this.makeIdentifier = makeIdentifier;
        this.entityName = entityName;
        this._fields = this.mountFields(fields);
        const errors = this.configureValidation().validate();
        if (errors.length) {
            throw new validation_error_1.ValidationError(errors, this.entityName);
        }
    }
    get id() {
        return this._fields.id;
    }
    get createdAt() {
        return this._fields.createdAt;
    }
    get updatedAt() {
        return this._fields.updatedAt;
    }
    toJSON() {
        return Object.assign({}, this._fields);
    }
}
exports.Entity = Entity;
