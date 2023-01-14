"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
const value_object_1 = require("@shared/domain/value_objects/value_object");
class Email extends value_object_1.ValueObject {
    constructor(email) {
        super(email);
    }
    get domain() {
        return this.splittedEmail[1];
    }
    get username() {
        return this.splittedEmail[0];
    }
    get emailInfo() {
        return {
            username: this.username,
            domain: this.domain
        };
    }
    get splittedEmail() {
        const [username, domain] = this.value.split('@');
        return [username, domain];
    }
}
exports.Email = Email;
