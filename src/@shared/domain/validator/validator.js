"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFakeValidator = void 0;
const createFakeValidator = (validateResult = []) => {
    const validator = {
        isValidIdentifier: (_) => validator,
        isValidEmail: (_) => validator,
        isEmptyString: (_) => validator,
        maxStringLength: (_) => validator,
        minSringLength: (_) => validator,
        isDateAfterOrEquals: (_) => validator,
        isDateBeforeOrEquals: (_) => validator,
        validate: () => validateResult,
    };
    return validator;
};
exports.createFakeValidator = createFakeValidator;
