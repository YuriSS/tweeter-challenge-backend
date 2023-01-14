"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakeIdentifierImpl = void 0;
const uuid_1 = require("@shared/domain/value_objects/uuid/uuid");
const uuid_2 = require("uuid");
class MakeIdentifierImpl {
    make() {
        return new uuid_1.Identifier({ id: (0, uuid_2.v4)() });
    }
    create(id) {
        return new uuid_1.Identifier({ id });
    }
}
exports.MakeIdentifierImpl = MakeIdentifierImpl;
