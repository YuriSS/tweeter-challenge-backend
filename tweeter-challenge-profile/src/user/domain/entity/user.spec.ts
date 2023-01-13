import { createMock } from "ts-auto-mock";
import { UserEntityInput } from "@user/domain/entity/user.type";
import { createFakeIdentifier } from "@shared/domain/value_objects/uuid/uuid";
import { UserEntity } from "@user/domain/entity/user";
import { createFakeValidator } from "@shared/domain/validator/validator";

describe("UserEntity", () => {
  it("should instance correctly a user", () => {
    const profileMock = createMock<UserEntityInput>();
    const identifierMaker = createFakeIdentifier();
    const identifierMakerSpy = jest.spyOn(identifierMaker, 'make');

    const profile = new UserEntity(profileMock, createFakeValidator(), identifierMaker);

    expect(identifierMakerSpy).toHaveBeenCalledTimes(1);
    expect(profile.id).toBeTruthy();
    expect(profile.username).toEqual(profileMock.username);
    expect(profile.password).toEqual(profileMock.password);
  });
});
