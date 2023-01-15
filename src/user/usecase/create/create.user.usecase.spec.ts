import { ResourceNotFoundError } from "@shared/domain/errors/resource_not_found/resource_not_found.error";
import { createFakeValidator } from "@shared/domain/validator/validator";
import { createFakeIdentifier } from "@shared/domain/value_objects/uuid/uuid";
import { UserModel } from "@user/domain/repository/user.repository";
import { createMock } from "ts-auto-mock";
import { CreateUserUsecase } from "./create.user.usecase";

describe("Create user unit usecase", () => {
  const date = new Date();
  const userModel = createMock<UserModel>({
    username: "Jhon",
    password: "111",
  });
  const validator = createFakeValidator();
  const makeId = createFakeIdentifier();
  const createRepositoryMock = () => ({
    create: jest.fn().mockReturnValue(Promise.resolve()),
    find: jest.fn(),
    update: jest.fn(),
    findBy: jest.fn().mockImplementation(() => Promise.reject(new ResourceNotFoundError({ field: "field", value: "value", scope: "scope" }))),
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
    const usecase = new CreateUserUsecase(userRepository, validator, makeId);

    const output = await usecase.execute(userModel);

    expect(output).toEqual({
      id: `1e${date.getTime()}`,
      username: userModel.username,
      password: userModel.password,
      createdAt: date,
      updatedAt: date,
    });
  });

  it("should not create a user because validation error", async () => {
    const userRepository = createRepositoryMock();
    const validator = createFakeValidator([{ field: "field", message: "message" }]);
    const usecase = new CreateUserUsecase(userRepository, validator, makeId);

    await expect(async () => {
      await usecase.execute(userModel);
    }).rejects.toThrow("message");
  });
  
  it("should not create a duplicated user", async () => {
    const userRepository = createRepositoryMock();
    const usecase = new CreateUserUsecase(userRepository, validator, makeId);
    userRepository.findBy.mockImplementation(() => {});

    await expect(async () => {
      await usecase.execute(userModel);
    }).rejects.toThrow("Username already exist");
  });
});
