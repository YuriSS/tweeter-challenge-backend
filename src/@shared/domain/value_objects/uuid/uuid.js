"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFakeIdentifier = exports.Identifier = void 0;
const value_object_1 = require("@shared/domain/value_objects/value_object");
class Identifier extends value_object_1.ValueObject {
    constructor(id) {
        super(id);
    }
}
exports.Identifier = Identifier;
const createFakeIdentifier = (seed = 1) => ({
    make: () => new Identifier({ id: `${seed++}e${Date.now()}` }),
    create: (id) => new Identifier({ id }),
});
exports.createFakeIdentifier = createFakeIdentifier;
