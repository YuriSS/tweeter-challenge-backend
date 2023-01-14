"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_auto_mock_1 = require("ts-auto-mock");
const uuid_1 = require("@shared/domain/value_objects/uuid/uuid");
const user_1 = require("@user/domain/entity/user");
const validator_1 = require("@shared/domain/validator/validator");
describe("UserEntity", () => {
    it("should instance correctly a user", () => {
        const profileMock = (0, ts_auto_mock_1.createMock)();
        const identifierMaker = (0, uuid_1.createFakeIdentifier)();
        const identifierMakerSpy = jest.spyOn(identifierMaker, 'make');
        const profile = new user_1.UserEntity(profileMock, (0, validator_1.createFakeValidator)(), identifierMaker);
        expect(identifierMakerSpy).toHaveBeenCalledTimes(1);
        expect(profile.id).toBeTruthy();
        expect(profile.username).toEqual(profileMock.username);
        expect(profile.password).toEqual(profileMock.password);
    });
});
