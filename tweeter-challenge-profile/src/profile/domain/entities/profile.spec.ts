import { ProfileEntity, ProfileEntityFields } from "@profile/domain/entities/profile"
import { Identifier } from "@shared/domain/value_objects/uuid/uuid";
import { createMock } from "ts-auto-mock"

describe("ProfileEntity", () => {
  it("should instance correctly a profile", () => {
    const profileMock = createMock<ProfileEntityFields>({
      tweets: undefined,
      bio: undefined,
    });
    const id = new Identifier({ id: '1' }, { hasError: (): undefined => undefined });
    const profile = new ProfileEntity(profileMock, id);

    expect(profile.name).toEqual(profileMock.name);
    expect(profile.email).toEqual(profileMock.email);
    expect(profile.tweets).toEqual([]);
    expect(profile.bio).toBe("");
    expect(profile.id).toBeInstanceOf(Identifier);
  });
})
