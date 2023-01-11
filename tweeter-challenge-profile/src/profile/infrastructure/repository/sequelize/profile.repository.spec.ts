import { Sequelize } from "sequelize-typescript";
import { ProfileModel } from "@profile/infrastructure/repository/sequelize/profile.model";
import { ProfileRepository } from "@profile/infrastructure/repository/sequelize/profile.repository";
import { ProfileEntity } from "@profile/domain/entity/profile";
import { createFakeValidator } from "@shared/domain/validator/validator";
import { createMock } from "ts-auto-mock";
import { ProfileEntityInput } from "@profile/domain/entity/profile.type";

describe("Profile Repository", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true}
    });
    sequelize.addModels([ProfileModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a profile", async () => {
    const profileRepository = new ProfileRepository();
    const profileInput = createMock<ProfileEntityInput>();
    const profile = new ProfileEntity(profileInput, createFakeValidator());

    await profileRepository.create(profile);

    const profileModel = await ProfileModel.findOne({ where: { id: "1" } });

    expect(profileModel?.toJSON()).toStrictEqual({
      id: "1",
      userId: profileInput.userId.value,
      firstName: profileInput.name.firstName,
      lastName: profileInput.name.lastName,
      email: profileInput.email.value,
      biography: profileInput.biography,
    });
  });
});
