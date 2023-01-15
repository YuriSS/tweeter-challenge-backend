import { createFakeIdentifier } from "@shared/domain/value_objects/uuid/uuid";
import { UserModel } from "@user/domain/repository/user.repository";
import { createMock } from "ts-auto-mock";
import { FindUserUsecase } from "./find.user.usecase";

describe("Find user unit integration", () => {
  const userModel = createMock<UserModel>({ username: "Jhon", password: "111" });
  const makeId = createFakeIdentifier();
  const createRepositoryMock = (result: UserModel) => ({
    find: jest.fn().mockReturnValue(Promise.resolve(result)),
    create: jest.fn(),
    update: jest.fn(),
    findBy: jest.fn(),
    findAll: jest.fn(),
  });

  it("should find a user", async () => {
    // Arrange
    const userRepository = createRepositoryMock(userModel);
    const usecase = new FindUserUsecase(userRepository, makeId);

    // Act
    const output = await usecase.execute({ id: '123' });

    // Assert
    expect(output).toEqual({
      id: userModel.id,
      username: userModel.username,
      password: userModel.password,
      createdAt: userModel.createdAt,
      updatedAt: userModel.updatedAt,
    });
  });

  it("should not find a user", async () => {
    // Arrange
    const userRepository = createRepositoryMock(userModel);
    userRepository.find.mockImplementation(() => {
      throw new Error("User not found");
    });
    const usecase = new FindUserUsecase(userRepository, makeId);

    // Act/Assert
    expect(async () => {
      return await usecase.execute({ id: "123" })
    }).rejects.toThrow("User not found");
  });
});
