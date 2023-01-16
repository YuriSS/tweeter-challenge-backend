import { ProfileRepository } from "@profile/infrastructure/repository/sequelize/profile.repository";
import { ProfileSequelizeModel } from "@profile/infrastructure/repository/sequelize/profile.repository.model";
import { FindProfileUsecase } from "@profile/usecase/find/find.profile.usecase";
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
import { InputUserCreateDto } from "./create.user.usecase.type";

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
    sequelize.addModels([UserSequelizeModel, ProfileSequelizeModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    jest.useRealTimers();
    await sequelize.close();
  });

  it("should create user and a profile", async () => {
    // Arrange
    const userRepository = new UserRepository();
    const profileRepository = new ProfileRepository();
    const validator = createFakeValidator();
    const makeId = createFakeIdentifier();
    const usecase = new CreateUserUsecase(
      userRepository,
      profileRepository,
      validator,
      makeId
    );
    const id = `1e${date.getTime()}`;
    const profileId = `2e${date.getTime()}`;
    const inputCreateUserDto: InputUserCreateDto = {
      password: "123",
      username: "jhondoe",
      email: "jhondoe@gmail.com",
    };

    // Act
    const output = await usecase.execute(inputCreateUserDto);

    // Assert
    expect(output).toEqual({
      id,
      username: inputCreateUserDto.username,
      email: inputCreateUserDto.email,
      profileId,
      createdAt: date,
      updatedAt: date,
    });

    // Arrange
    const findUsecase = new FindUserUsecase(userRepository, makeId);
    const findProfileUsecase = new FindProfileUsecase(profileRepository);

    // Act
    const findUserOutput = await findUsecase.execute({ id });
    const findProfileOutput = await findProfileUsecase.execute({
      id: profileId,
    });

    // Assert
    expect(findUserOutput).toEqual({
      id,
      username: inputCreateUserDto.username,
      email: inputCreateUserDto.email,
      profileId,
      createdAt: date,
      updatedAt: date,
    });

    expect(findProfileOutput).toEqual({
      id: profileId,
      userId: id,
      name: {
        firstName: inputCreateUserDto.username,
        lastName: null,
      },
      biography: null,
      createdAt: date,
      updatedAt: date,
    });
  });

  it("should not create user because validation error", async () => {
    // Arrange
    const userRepository = new UserRepository();
    const profileRepository = new ProfileRepository();
    const makeId = createFakeIdentifier();
    const id = `1e${date.getTime()}`;
    const createProfileSpy = jest.spyOn(profileRepository, "create");
    const validator = createFakeValidator([
      { field: "id", message: "something wrong" },
    ]);
    const usecase = new CreateUserUsecase(
      userRepository,
      profileRepository,
      validator,
      makeId
    );
    const createExecution = async () => {
      await usecase.execute({
        password: "123",
        username: "jhondoe",
        email: "jhondoe@gmail.com",
      });
    };

    // Act
    await expect(createExecution).rejects.toThrow("something wrong");
    await expect(createExecution).rejects.toThrow(ValidationError);
    expect(createProfileSpy).not.toHaveBeenCalled();

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
    const profileRepository = new ProfileRepository();
    const validator = createFakeValidator();
    const makeId = createFakeIdentifier();
    const createProfileSpy = jest.spyOn(profileRepository, "create");
    const usecase = new CreateUserUsecase(
      userRepository,
      profileRepository,
      validator,
      makeId
    );

    // Act
    await usecase.execute({
      password: "321",
      username: "jhondoe",
      email: "jhondoe@gmail.com",
    });

    const secondExecution = async () => {
      await usecase.execute({
        password: "123",
        username: "jhondoe",
        email: "jhondoe@gmail.com",
      });
    };

    // Assert
    await expect(secondExecution).rejects.toThrow("Username already exist");
    await expect(secondExecution).rejects.toThrow(ConflictError);
    expect(createProfileSpy).toHaveBeenCalledTimes(1);
  });
});
