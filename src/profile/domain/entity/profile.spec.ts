import { ProfileEntity } from "@profile/domain/entity/profile"
import { ProfileEntityInput } from "@profile/domain/entity/profile.type"
import { createFakeValidator } from "@shared/domain/validator/validator";
import { createFakeIdentifier, Identifier } from "@shared/domain/value_objects/uuid/uuid";
import { createMock } from "ts-auto-mock"

describe("ProfileEntity", () => {
  it("should instance correctly a profile", () => {
    const profileMock = createMock<ProfileEntityInput>({
      id: undefined,
      biography: undefined,
    });
    const identifierMaker = createFakeIdentifier();
    const identifierMakerSpy = jest.spyOn(identifierMaker, 'make');

    const profile = new ProfileEntity(profileMock, createFakeValidator(), identifierMaker);

    expect(identifierMakerSpy).toHaveBeenCalledTimes(1);
    expect(profile.name).toEqual(profileMock.name);
    expect(profile.userId).toEqual(profileMock.userId);
    expect(profile.biography).toBe(undefined);
    expect(profile.id).toBeInstanceOf(Identifier);
  });
});
