import { ProfileModel } from "@profile/domain/repository/profile.repository";
import { ResourceNotFoundError } from "@shared/domain/errors/resource_not_found/resource_not_found.error";
import { createFakeValidator } from "@shared/domain/validator/validator";
import { createFakeIdentifier } from "@shared/domain/value_objects/uuid/uuid";
import { createMock } from "ts-auto-mock";
import { CreateProfileUsecase } from "./create.profile.usecase";

describe("Create profile unit usecase", () => {
  const date = new Date();
  const profileModel = createMock<ProfileModel>({
    firstName: "Jhon",
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

  it("should create a profile", async () => {
    const profileRepository = createRepositoryMock();
    const usecase = new CreateProfileUsecase(
      profileRepository,
      validator,
      makeId
    );

    const output = await usecase.execute(profileModel);

    expect(output).toEqual({
      id: `1e${date.getTime()}`,
      name: {
        firstName: profileModel.firstName,
        lastName: profileModel.lastName,
      },
      userId: profileModel.userId,
      biography: undefined,
      createdAt: date,
      updatedAt: date,
    });
  });

  it("should not create a profile because validation error", async () => {
    const profileRepository = createRepositoryMock();
    const validator = createFakeValidator([
      { field: "field", message: "message" },
    ]);
    const usecase = new CreateProfileUsecase(
      profileRepository,
      validator,
      makeId
    );

    await expect(async () => {
      await usecase.execute(profileModel);
    }).rejects.toThrow("message");
  });

  it("should not create a profile if the user already has one", async () => {
    const profileRepository = createRepositoryMock();
    const usecase = new CreateProfileUsecase(
      profileRepository,
      validator,
      makeId
    );
    profileRepository.findBy.mockImplementation(() => {});

    await expect(async () => {
      await usecase.execute(profileModel);
    }).rejects.toThrow("User already have a profile");
  });
});
