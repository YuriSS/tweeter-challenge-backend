import { ConflictError } from "@shared/domain/errors/conflict/conflict.error";
import { ResourceNotFoundError } from "@shared/domain/errors/resource_not_found/resource_not_found.error";
import { ValidationError } from "@shared/domain/errors/validation/validation.error";
import { createFakeValidator } from "@shared/domain/validator/validator";
import { createFakeIdentifier } from "@shared/domain/value_objects/uuid/uuid";
import { UserRepository } from "@user/infrastructure/repository/user.repository";
import { UserSequelizeModel } from "@user/infrastructure/repository/user.repository.model";
import { Sequelize } from "sequelize-typescript";
import { FindUserUsecase } from "../find/find.user.usecase";
import { CreateUserUsecase } from "./create.user.usecase";

describe("Create user integration usecase", () => {
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

  it("should create user", async () => {
    // Arrange
    const userRepository = new UserRepository();
    const validator = createFakeValidator();
    const makeId = createFakeIdentifier();
    const usecase = new CreateUserUsecase(userRepository, validator, makeId);
    const id = `1e${date.getTime()}`;

    // Act
    const output = await usecase.execute({
      password: "123",
      username: "jhondoe",
    });

    // Assert
    expect(output).toEqual({
      id,
      username: "jhondoe",
      password: "123",
      createdAt: date,
      updatedAt: date,
    });

    // Arrange
    const findUsecase = new FindUserUsecase(userRepository, makeId);

    // Act
    const findOutput = await findUsecase.execute({ id });

    // Assert
    expect(findOutput).toEqual({
      id,
      username: "jhondoe",
      password: "123",
      profileId: null,
      createdAt: date,
      updatedAt: date,
    });
  });

  it("should not create user because validation error", async () => {
    // Arrange
    const userRepository = new UserRepository();
    const validator = createFakeValidator([
      { field: "id", message: "something wrong" },
    ]);
    const makeId = createFakeIdentifier();
    const usecase = new CreateUserUsecase(userRepository, validator, makeId);
    const id = `1e${date.getTime()}`;
    const createExecution = async () => {
      await usecase.execute({
        password: "123",
        username: "jhondoe",
      });
    };

    // Act
    await expect(createExecution).rejects.toThrow("something wrong");
    await expect(createExecution).rejects.toThrow(ValidationError);

    // Arrange
    const findUsecase = new FindUserUsecase(userRepository, makeId);
    const findExecution = async () => {
      await findUsecase.execute({ id });
    };

    // Act
    await expect(findExecution).rejects.toThrow(
      `id with value ${id} not found on User`
    );
    await expect(findExecution).rejects.toThrow(ResourceNotFoundError);
  });

  it("should not create user duplicated", async () => {
    // Arrange
    const userRepository = new UserRepository();
    const validator = createFakeValidator();
    const makeId = createFakeIdentifier();
    const usecase = new CreateUserUsecase(userRepository, validator, makeId);

    // Act
    await usecase.execute({
      password: "321",
      username: "jhondoe",
    });

    const secondExecution = async () => {
      await usecase.execute({
        password: "123",
        username: "jhondoe",
      });
    };

    // Assert
    await expect(secondExecution).rejects.toThrow("Username already exist");
    await expect(secondExecution).rejects.toThrow(ConflictError);
  });
});
