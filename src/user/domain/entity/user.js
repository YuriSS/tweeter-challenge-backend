"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
const entity_1 = require("@shared/domain/entities/entity");
const user_validation_1 = require("@user/domain/validation/user.validation");
class UserEntity extends entity_1.Entity {
    constructor(fields, validator, makeIdentifier) {
        super(fields, validator, makeIdentifier, 'User');
        this.validator = validator;
        this.makeIdentifier = makeIdentifier;
    }
    get username() {
        return this._fields.username;
    }
    get password() {
        return this._fields.password;
    }
    get profileId() {
        return this._fields.profileId;
    }
    mountFields(fields) {
        return {
            id: fields.id || this.makeIdentifier.make(),
            username: fields.username,
            password: fields.password,
            profileId: fields.profileId,
            updatedAt: fields.updatedAt || new Date(),
            createdAt: fields.createdAt || new Date(),
        };
    }
    configureValidation() {
        return user_validation_1.UserValidationFactory.create(this.validator).configureValidation(this._fields, this.entityName);
    }
}
exports.UserEntity = UserEntity;
