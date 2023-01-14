"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const name_1 = require("@shared/domain/value_objects/name/name");
describe('Name', () => {
    it('should construct name as valid', () => {
        const nameMock = { firstName: 'Jhon', lastName: 'Test' };
        const name = new name_1.Name(nameMock);
        expect(name.value).toEqual({
            firstName: nameMock.firstName,
            lastName: nameMock.lastName,
        });
        expect(name.fullName).toBe(`${nameMock.firstName} ${nameMock.lastName}`);
    });
});
