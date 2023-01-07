import { ProfileEntity, ProfileEntityFields } from "./profile"
import { createMock } from "ts-auto-mock"
import { UUID } from "@shared/domain/value_objects/uuid/uuid";

describe("ProfileEntity", () => {
  it("should instance correctly a profile", () => {
    const profileMock = createMock<ProfileEntityFields>({
      tweets: undefined
    });
    const uuid = new UUID();
    const profile = new ProfileEntity(profileMock, uuid);

    expect(profile.name).toBe(profileMock.name);
    expect(profile.email).toBe(profileMock.email);
    expect(profile.tweets).toEqual([]);
    expect(profile.id).toBe(uuid.value);
  });
})
