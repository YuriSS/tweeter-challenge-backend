"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Name = void 0;
const value_object_1 = require("@shared/domain/value_objects/value_object");
class Name extends value_object_1.ValueObject {
    constructor(fields) {
        super(fields);
    }
    get firstName() {
        return this.value.firstName;
    }
    get lastName() {
        return this.value.lastName;
    }
    get fullName() {
        return `${this.firstName} ${this.lastName}`.trim();
    }
}
exports.Name = Name;
