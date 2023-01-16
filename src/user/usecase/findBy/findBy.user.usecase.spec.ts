import { UserModel } from "@user/domain/repository/user.repository";
import { createMock } from "ts-auto-mock";
import { FindByUserUsecase } from "./findBy.user.usecase";

describe("findBy user unit usecase", () => {
  const userModel = createMock<UserModel>({ username: "Jhon", password: "111" });
  const createRepositoryMock = (result: UserModel) => ({
    findBy: jest.fn().mockReturnValue(Promise.resolve(result)),
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
  });

  it("should find a user", async () => {
    // Arrange
    const userRepository = createRepositoryMock(userModel);
    const usecase = new FindByUserUsecase(userRepository);

    // Act
    const output = await usecase.execute({ username: "value" });

    // Assert
    expect(output).toEqual({
      id: userModel.id,
      email: userModel.email,
      username: userModel.username,
      profileId: undefined,
      createdAt: userModel.createdAt,
      updatedAt: userModel.updatedAt,
    });
  });

  it("should not find a user", async () => {
    // Arrange
    const userRepository = createRepositoryMock(userModel);
    userRepository.findBy.mockImplementation(() => {
      throw new Error("User not found");
    });
    const usecase = new FindByUserUsecase(userRepository);

    // Act/Assert
    expect(async () => {
      return await usecase.execute({ username: "value" })
    }).rejects.toThrow("User not found");
  });
});
