import { Sequelize } from "sequelize-typescript";
import { ProfileSequelizeModel } from "@profile/infrastructure/repository/sequelize/profile.repository.model";
import { ProfileRepository } from "@profile/infrastructure/repository/sequelize/profile.repository";
import { ProfileEntity } from "@profile/domain/entity/profile";
import { createFakeValidator } from "@shared/domain/validator/validator";
import { createMock } from "ts-auto-mock";
import { ProfileEntityInput } from "@profile/domain/entity/profile.type";
import { createFakeIdentifier } from "@shared/domain/value_objects/uuid/uuid";

describe("Profile Repository", () => {
  const date = new Date();
  let sequelize: Sequelize;

  beforeEach(async () => {
    jest.useFakeTimers().setSystemTime(date);

    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true}
    });
    sequelize.addModels([ProfileSequelizeModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
    jest.useRealTimers();
  });

  it("should create a profile", async () => {
    const profileRepository = new ProfileRepository();
    const profileInput = createMock<ProfileEntityInput>();
    const profile = new ProfileEntity(profileInput, createFakeValidator(), createFakeIdentifier());
    const id= `1e${date.getTime()}`;

    await profileRepository.create(profile);

    const profileModel = await ProfileSequelizeModel.findOne({ where: { id } });

    expect(profileModel?.toJSON()).toStrictEqual({
      id,
      userId: profile.userId.value.id,
      firstName: profile.name.firstName,
      lastName: profile.name.lastName,
      email: profile.email.value,
      biography: profile.biography,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt
    });
  });
});
