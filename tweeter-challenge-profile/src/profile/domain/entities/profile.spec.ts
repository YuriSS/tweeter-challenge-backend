import { ProfileEntity, ProfileEntityFields } from "./profile"
import { createMock } from "ts-auto-mock"
import { UUID } from "@shared/domain/value_objects/uuid/uuid";
import { Email } from "@shared/domain/value_objects/email/email";
import { Name } from "@shared/domain/value_objects/name/name";

describe("ProfileEntity", () => {
  it("should instance correctly a profile", () => {
    const profileMock = createMock<ProfileEntityFields>({
      tweets: undefined,
      email: new Email('test@auei.br'),
      name: new Name('Test')
    });
    const uuid = new UUID();
    const profile = new ProfileEntity(profileMock, uuid);

    expect(profile.name).toBe(profileMock.name.value);
    expect(profile.email).toBe(profileMock.email.value);
    expect(profile.tweets).toEqual([]);
    expect(profile.id).toBe(uuid.value);
  });
})
