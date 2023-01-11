import { ProfileEntity } from "@profile/domain/entity/profile"
import { ProfileEntityInput } from "@profile/domain/entity/profile.type"
import { createFakeValidator } from "@shared/domain/validator/validator";
import { createMock } from "ts-auto-mock"

describe("ProfileEntity", () => {
  it("should instance correctly a profile", () => {
    const profileMock = createMock<ProfileEntityInput>({
      biography: undefined,
    });

    const profile = new ProfileEntity(profileMock, createFakeValidator());

    expect(profile.name).toEqual(profileMock.name);
    expect(profile.email).toEqual(profileMock.email);
    expect(profile.user).toEqual(profileMock.user);
    expect(profile.id).toEqual(profileMock.id);
    expect(profile.biography).toBe("");
  });
});
