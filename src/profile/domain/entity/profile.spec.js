"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const profile_1 = require("@profile/domain/entity/profile");
const validator_1 = require("@shared/domain/validator/validator");
const uuid_1 = require("@shared/domain/value_objects/uuid/uuid");
const ts_auto_mock_1 = require("ts-auto-mock");
describe("ProfileEntity", () => {
    it("should instance correctly a profile", () => {
        const profileMock = (0, ts_auto_mock_1.createMock)({
            id: undefined,
            biography: undefined,
        });
        const identifierMaker = (0, uuid_1.createFakeIdentifier)();
        const identifierMakerSpy = jest.spyOn(identifierMaker, 'make');
        const profile = new profile_1.ProfileEntity(profileMock, (0, validator_1.createFakeValidator)(), identifierMaker);
        expect(identifierMakerSpy).toHaveBeenCalledTimes(1);
        expect(profile.name).toEqual(profileMock.name);
        expect(profile.email).toEqual(profileMock.email);
        expect(profile.userId).toEqual(profileMock.userId);
        expect(profile.biography).toBe("");
        expect(profile.id).toBeTruthy();
    });
});
