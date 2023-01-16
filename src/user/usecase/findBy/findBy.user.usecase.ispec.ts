import { ResourceNotFoundError } from "@shared/domain/errors/resource_not_found/resource_not_found.error";
import { createFakeValidator } from "@shared/domain/validator/validator";
import { Email } from "@shared/domain/value_objects/email/email";
import { createFakeIdentifier } from "@shared/domain/value_objects/uuid/uuid";
import { UserEntity } from "@user/domain/entity/user";
import { UserRepository } from "@user/infrastructure/repository/user.repository";
import { UserSequelizeModel } from "@user/infrastructure/repository/user.repository.model";
import { Sequelize } from "sequelize-typescript";
import { FindByUserUsecase } from "@user/usecase/findBy/findBy.user.usecase";

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
        email: new Email("jhondoe@gmail.com"),
        profileId: makeId.make(),
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
      id: `2e${date.getTime()}`,
      username: "jhondoe",
      email: "jhondoe@gmail.com",
      profileId: `1e${date.getTime()}`,
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
        email: new Email("jhondoe@gmail.com"),
        profileId: makeId.make(),
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
        email: new Email("jennifer@gmail.com"),
        profileId: makeId.make(),
        createdAt,
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
      id: `4e${date.getTime()}`,
      username: "jennifer",
      email: "jennifer@gmail.com",
      profileId: `3e${date.getTime()}`,
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
    await expect(execution).rejects.toThrow(
      `username with value value not found on User`
    );
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
        email: new Email("jhondoe@gmail.com"),
        profileId: makeId.make(),
        password: "1",
        username: "jhondoe",
      },
      validator,
      makeId
    );
    const secondUserEntity = new UserEntity(
      {
        email: new Email("jennifer@gmail.com"),
        profileId: makeId.make(),
        password: "1",
        username: "jennifer",
        createdAt: new Date(date.getTime() - 1000 * 60 * 60 * 24),
      },
      validator,
      makeId
    );

    userRepository.create(userEntity);
    userRepository.create(secondUserEntity);

    const execution = () =>
      usecase.execute({ username: "jennifer", createdAt: tomorrow });

    await expect(execution).rejects.toThrow(
      `username, createdAt with value jennifer, ${tomorrow} not found on User`
    );
    await expect(execution).rejects.toThrow(ResourceNotFoundError);
  });
});
