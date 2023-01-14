"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileEntity = void 0;
const entity_1 = require("@shared/domain/entities/entity");
const profile_validation_1 = require("@profile/domain/validation/profile.validation");
class ProfileEntity extends entity_1.Entity {
    constructor(fields, validator, makeIdentifier) {
        super(fields, validator, makeIdentifier, 'Profile');
        this.validator = validator;
        this.makeIdentifier = makeIdentifier;
    }
    get userId() {
        return this._fields.userId;
    }
    get name() {
        return this._fields.name;
    }
    get email() {
        return this._fields.email;
    }
    get biography() {
        return this._fields.biography;
    }
    mountFields(fields) {
        return {
            id: fields.id || this.makeIdentifier.make(),
            userId: fields.userId,
            name: fields.name,
            email: fields.email,
            biography: fields.biography || "",
            updatedAt: fields.updatedAt || new Date(),
            createdAt: fields.createdAt || new Date(),
        };
    }
    configureValidation() {
        return profile_validation_1.ProfileValidationFactory.create(this.validator).configureValidation(this._fields, this.entityName);
    }
}
exports.ProfileEntity = ProfileEntity;
