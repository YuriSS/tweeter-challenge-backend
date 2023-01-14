"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueObject = void 0;
const object_1 = require("@shared/domain/helpers/object");
class ValueObject {
    constructor(value) {
        this._value = (0, object_1.deepFreeze)(value);
    }
    get value() {
        return this._value;
    }
}
exports.ValueObject = ValueObject;
