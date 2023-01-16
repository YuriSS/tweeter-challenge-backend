import { ProfileEntity } from "@profile/domain/entity/profile";
import { ResourceNotFoundError } from "@shared/domain/errors/resource_not_found/resource_not_found.error";
import { createFakeValidator } from "@shared/domain/validator/validator";
import { Email } from "@shared/domain/value_objects/email/email";
import { Name } from "@shared/domain/value_objects/name/name";
import {
  createFakeIdentifier,
  Identifier,
} from "@shared/domain/value_objects/uuid/uuid";
import { UserEntity } from "@user/domain/entity/user";
import { UserModel } from "@user/domain/repository/user.repository";
import { createMock } from "ts-auto-mock";
import { CreateUserUsecase } from "./create.user.usecase";

describe("Create user unit usecase", () => {
  const date = new Date();
  const userModel = createMock<UserModel>({
    username: "Jhon",
    password: "111",
    email: "jhondoe@gmail.com",
  });
  const validator = createFakeValidator();
  const makeId = createFakeIdentifier();
  const createRepositoryMock = () => ({
    create: jest.fn().mockReturnValue(Promise.resolve()),
    find: jest.fn(),
    update: jest.fn(),
    findBy: jest.fn().mockImplementation(() =>
      Promise.reject(
        new ResourceNotFoundError({
          field: "field",
          value: "value",
          scope: "scope",
        })
      )
    ),
    findAll: jest.fn(),
  });

  beforeEach(async () => {
    jest.useFakeTimers().setSystemTime(date);
  });

  afterEach(async () => {
    jest.useRealTimers();
  });

  it("should create a user", async () => {
    const userRepository = createRepositoryMock();
    const profileRepository = createRepositoryMock();
    const usecase = new CreateUserUsecase(
      userRepository,
      profileRepository,
      validator,
      makeId
    );
    const createUserRepositorySpy = jest.spyOn(userRepository, "create");
    const findByUserRepositorySpy = jest.spyOn(userRepository, "findBy");
    const createProfileRepositorySpy = jest.spyOn(profileRepository, "create");
    const userId = `1e${date.getTime()}`;
    const profileId = `2e${date.getTime()}`;

    const output = await usecase.execute(userModel);

    expect(createUserRepositorySpy).toHaveBeenCalledTimes(1);
    expect(findByUserRepositorySpy).toHaveBeenCalledTimes(1);
    expect(createProfileRepositorySpy).toHaveBeenCalledTimes(1);

    expect(findByUserRepositorySpy).toHaveBeenCalledWith({
      username: userModel.username,
    });

    expect(createUserRepositorySpy).toHaveBeenCalledWith(
      new UserEntity(
        {
          id: new Identifier({ id: userId }),
          username: userModel.username,
          password: userModel.password,
          profileId: new Identifier({ id: profileId }),
          email: new Email(userModel.email),
          createdAt: userModel.createdAt,
          updatedAt: userModel.updatedAt,
        },
        validator,
        makeId
      )
    );

    expect(createProfileRepositorySpy).toHaveBeenCalledWith(
      new ProfileEntity(
        {
          userId: new Identifier({ id: userId }),
          name: new Name({
            firstName: userModel.username,
            lastName: undefined,
          }),
          id: new Identifier({ id: profileId }),
          biography: undefined,
          updatedAt: undefined,
          createdAt: undefined,
        },
        validator,
        makeId
      )
    );

    expect(output).toEqual({
      id: userId,
      username: userModel.username,
      profileId,
      email: userModel.email,
      createdAt: date,
      updatedAt: date,
    });
  });

  it("should not create a user because validation error", async () => {
    const userRepository = createRepositoryMock();
    const profileRepository = createRepositoryMock();
    const validator = createFakeValidator([
      { field: "field", message: "message" },
    ]);
    const usecase = new CreateUserUsecase(
      userRepository,
      profileRepository,
      validator,
      makeId
    );

    await expect(async () => {
      await usecase.execute(userModel);
    }).rejects.toThrow("message");
  });

  it("should not create a duplicated user", async () => {
    const userRepository = createRepositoryMock();
    const profileRepository = createRepositoryMock();
    const usecase = new CreateUserUsecase(
      userRepository,
      profileRepository,
      validator,
      makeId
    );
    userRepository.findBy.mockImplementation(() => Promise.resolve({}));

    await expect(async () => {
      await usecase.execute(userModel);
    }).rejects.toThrow("Username already exist");
  });
});
