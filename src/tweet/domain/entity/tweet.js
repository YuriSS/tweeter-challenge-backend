"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TweetEntity = void 0;
const entity_1 = require("@shared/domain/entities/entity");
const tweet_validation_1 = require("@tweet/domain/validation/tweet.validation");
class TweetEntity extends entity_1.Entity {
    constructor(fields, validator, makeIdentifier) {
        super(fields, validator, makeIdentifier, 'Tweet');
        this.validator = validator;
        this.makeIdentifier = makeIdentifier;
    }
    get text() {
        return this._fields.text;
    }
    get parent() {
        return this._fields.parent;
    }
    mountFields(fields) {
        return {
            id: fields.id || this.makeIdentifier.make(),
            text: fields.text,
            parent: fields.parent,
            updatedAt: fields.updatedAt || new Date(),
            createdAt: fields.createdAt || new Date(),
        };
    }
    configureValidation() {
        return tweet_validation_1.TweetValidationFactory.create(this.validator).configureValidation(this._fields, this.entityName);
    }
}
exports.TweetEntity = TweetEntity;
