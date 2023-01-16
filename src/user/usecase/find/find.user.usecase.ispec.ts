import { UserRepository } from "@user/infrastructure/repository/user.repository";
import { UserSequelizeModel } from "@user/infrastructure/repository/user.repository.model";
import { Sequelize } from "sequelize-typescript";
import { FindUserUsecase } from "@user/usecase/find/find.user.usecase";
import { createFakeIdentifier } from "@shared/domain/value_objects/uuid/uuid";
import { UserEntity } from "@user/domain/entity/user";
import { createFakeValidator } from "@shared/domain/validator/validator";
import { ResourceNotFoundError } from "@shared/domain/errors/resource_not_found/resource_not_found.error";
import { Email } from "@shared/domain/value_objects/email/email";

describe("Find use usecase integration", () => {
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

  it("should find a user", async () => {
    // Arrange
    const makeId = createFakeIdentifier();
    const validator = createFakeValidator();
    const userRepository = new UserRepository();
    const usecase = new FindUserUsecase(userRepository, makeId);

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
    const output = await usecase.execute({ id: `2e${date.getTime()}` });

    // Assert
    expect(output).toEqual({
      id: `2e${date.getTime()}`,
      username: "jhondoe",
      profileId: `1e${date.getTime()}`,
      email: "jhondoe@gmail.com",
      createdAt: date,
      updatedAt: date,
    });
  });

  it("should not find a user", async () => {
    // Arrange
    const makeId = createFakeIdentifier();
    const userRepository = new UserRepository();
    const usecase = new FindUserUsecase(userRepository, makeId);
    const execution = async () => {
      await usecase.execute({ id: `1e${date.getTime()}` });
    };

    // Act
    await expect(execution).rejects.toThrow(
      `id with value 1e${date.getTime()} not found on User`
    );
    await expect(execution).rejects.toThrow(ResourceNotFoundError);
  });
});
