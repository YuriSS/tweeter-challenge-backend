"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepFreeze = void 0;
const deepFreeze = (value) => {
    if (value && typeof value === 'object') {
        Object.getOwnPropertyNames(value).forEach((key) => {
            (0, exports.deepFreeze)(value[key]);
        });
    }
    return Object.freeze(value);
};
exports.deepFreeze = deepFreeze;
