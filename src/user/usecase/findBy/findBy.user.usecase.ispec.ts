import { ResourceNotFoundError } from "@shared/domain/errors/resource_not_found/resource_not_found.error";
import { createFakeValidator } from "@shared/domain/validator/validator";
import { createFakeIdentifier } from "@shared/domain/value_objects/uuid/uuid";
import { UserEntity } from "@user/domain/entity/user";
import { UserRepository } from "@user/infrastructure/repository/user.repository";
import { UserSequelizeModel } from "@user/infrastructure/repository/user.repository.model";
import { Sequelize } from "sequelize-typescript";
import { FindByUserUsecase } from "./findBy.user.usecase";

describe("findBy user integration usecase", () => {
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
    sequelize.addModels([UserSequelizeModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    jest.useRealTimers();
    await sequelize.close();
  });

  it("should find a user by username", async () => {
    // Arrange
    const makeId = createFakeIdentifier();
    const validator = createFakeValidator();
    const userRepository = new UserRepository();
    const usecase = new FindByUserUsecase(userRepository);
    const userEntity = new UserEntity(
      {
        password: "1",
        username: "jhondoe",
      },
      validator,
      makeId
    );

    userRepository.create(userEntity);

    // Act
    const output = await usecase.execute({ username: "jhondoe" });

    // Assert
    expect(output).toEqual({
      id: `1e${date.getTime()}`,
      username: "jhondoe",
      password: "1",
      profileId: null,
      createdAt: date,
      updatedAt: date,
    });
  });

  it("should find by multiple fields", async () => {
   // Arrange
    const makeId = createFakeIdentifier();
    const validator = createFakeValidator();
    const userRepository = new UserRepository();
    const usecase = new FindByUserUsecase(userRepository);
    const createdAt = new Date(date.getTime() - 1000 * 60 * 60 * 24);
    const userEntity = new UserEntity(
      {
        password: "1",
        username: "jhondoe",
      },
      validator,
      makeId
    );
    const secondUserEntity = new UserEntity(
      {
        password: "1",
        username: "jennifer",
        createdAt
      },
      validator,
      makeId
    );

    userRepository.create(userEntity);
    userRepository.create(secondUserEntity);

    // Act
    const output = await usecase.execute({ username: "jennifer", createdAt });

    // Assert
    expect(output).toEqual({
      id: `2e${date.getTime()}`,
      username: "jennifer",
      password: "1",
      profileId: null,
      createdAt,
      updatedAt: date,
    });
  });

  it("should not find a user by username", async () => {
    // Arrange
    const userRepository = new UserRepository();
    const usecase = new FindByUserUsecase(userRepository);
    const execution = async () => {
      await usecase.execute({ username: "value" });
    };

    // Act
    await expect(execution).rejects.toThrow(`username with value value not found on User`);
    await expect(execution).rejects.toThrow(ResourceNotFoundError);
  });

  it("should not find a user by multiple fields", async () => {
    // Arrange
    const makeId = createFakeIdentifier();
    const validator = createFakeValidator();
    const userRepository = new UserRepository();
    const usecase = new FindByUserUsecase(userRepository);
    const tomorrow = new Date(date.getTime() + 1000 * 60 * 60 * 24);
    const userEntity = new UserEntity(
      {
        password: "1",
        username: "jhondoe",
      },
      validator,
      makeId
    );
    const secondUserEntity = new UserEntity(
      {
        password: "1",
        username: "jennifer",
        createdAt: new Date(date.getTime() - 1000 * 60 * 60 * 24)
      },
      validator,
      makeId
    );

    userRepository.create(userEntity);
    userRepository.create(secondUserEntity);

    const execution = () => usecase.execute({ username: "jennifer", createdAt: tomorrow });

    await expect(execution).rejects.toThrow(`username, createdAt with value jennifer, ${tomorrow} not found on User`);
    await expect(execution).rejects.toThrow(ResourceNotFoundError);
  });
});
