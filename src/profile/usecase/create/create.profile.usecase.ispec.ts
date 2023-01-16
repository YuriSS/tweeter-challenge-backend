import { ProfileRepository } from "@profile/infrastructure/repository/sequelize/profile.repository";
import { ProfileSequelizeModel } from "@profile/infrastructure/repository/sequelize/profile.repository.model";
import { ConflictError } from "@shared/domain/errors/conflict/conflict.error";
import { ValidationError } from "@shared/domain/errors/validation/validation.error";
import { createFakeValidator } from "@shared/domain/validator/validator";
import { createFakeIdentifier } from "@shared/domain/value_objects/uuid/uuid";
import { Sequelize } from "sequelize-typescript";
import { FindProfileUsecase } from "../find/find.profile.usecase";
import { CreateProfileUsecase } from "./create.profile.usecase";

describe("Create profile integration usecase", () => {
  const date = new Date();
  let sequelize: Sequelize;

  beforeEach(async () => {
    jest.useFakeTimers().setSystemTime(date);
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([ProfileSequelizeModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    jest.useRealTimers();
    await sequelize.close();
  });

  it("should create profile", async () => {
    // Arrange
    const profileRepository = new ProfileRepository();
    const validator = createFakeValidator();
    const makeId = createFakeIdentifier();
    const usecase = new CreateProfileUsecase(profileRepository, validator, makeId);
    const profileId = `2e${date.getTime()}`;
    const userId = `1e${date.getTime()}`;

    // Act
    const output = await usecase.execute({
      userId: makeId.make().value.id,
      firstName: "jhondoe",
    });

    // Assert
    expect(output).toEqual({
      id: profileId,
      name: {
        firstName: "jhondoe",
        lastName: undefined
      },
      userId,
      biography: undefined,
      createdAt: date,
      updatedAt: date,
    });

    // Arrange
    const findUsecase = new FindProfileUsecase(profileRepository);

    // Act
    const findOutput = await findUsecase.execute({ id: profileId });

    // Assert
    expect(findOutput).toEqual({
      id: profileId,
      userId,
      name: {
        firstName: "jhondoe",
        lastName: null,
      },
      biography: null,
      createdAt: date,
      updatedAt: date,
    });
  });

  it("should not create profile because validation error", async () => {
    // Arrange
    const profileRepository = new ProfileRepository();
    const validator = createFakeValidator([
      { field: "id", message: "something wrong" },
    ]);
    const makeId = createFakeIdentifier();
    const usecase = new CreateProfileUsecase(profileRepository, validator, makeId);
    const createExecution = async () => {
      await usecase.execute({
        userId: makeId.make().value.id,
        firstName: "jhondoe",
      });
    };

    // Act
    await expect(createExecution).rejects.toThrow("something wrong");
    await expect(createExecution).rejects.toThrow(ValidationError);
  });

  it("should not create profile duplicated", async () => {
    // Arrange
    const profileRepository = new ProfileRepository();
    const validator = createFakeValidator();
    const makeId = createFakeIdentifier();
    const usecase = new CreateProfileUsecase(profileRepository, validator, makeId);
    const userId = makeId.make().value.id;

    // Act
    await usecase.execute({
      userId,
      firstName: "jhondoe",
    });

    const secondExecution = async () => {
      await usecase.execute({
        userId,
        firstName: "jhondoe",
      });
    };

    // Assert
    await expect(secondExecution).rejects.toThrow("User already have a profile");
    await expect(secondExecution).rejects.toThrow(ConflictError);
  });
});
