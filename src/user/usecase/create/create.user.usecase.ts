import {
  ProfileRepositoryContract,
} from "@profile/domain/repository/profile.repository";
import { CreateProfileUsecase } from "@profile/usecase/create/create.profile.usecase";
import { OutputCreateProfileDto } from "@profile/usecase/create/create.profile.usecase.type";
import { ConflictError } from "@shared/domain/errors/conflict/conflict.error";
import { ResourceNotFoundError } from "@shared/domain/errors/resource_not_found/resource_not_found.error";
import { Validator } from "@shared/domain/validator/validator";
import { Email } from "@shared/domain/value_objects/email/email";
import { Name } from "@shared/domain/value_objects/name/name";
import {
  Identifier,
  MakeIdentifier,
} from "@shared/domain/value_objects/uuid/uuid";
import { UserEntity } from "@user/domain/entity/user";
import { UserRepositoryContract } from "@user/domain/repository/user.repository";
import {
  InputUserCreateDto,
  OutputUserCreateDto,
} from "@user/usecase/create/create.user.usecase.type";
import { FindByUserUsecase } from "@user/usecase/findBy/findBy.user.usecase";

export class CreateUserUsecase {
  private _conflictErrorMessage = "Username already exist";

  public constructor(
    private userRepository: UserRepositoryContract,
    private profileRepository: ProfileRepositoryContract,
    private validator: Validator,
    private makeId: MakeIdentifier
  ) {}

  public async execute(
    fields: InputUserCreateDto
  ): Promise<OutputUserCreateDto> {
    if (await this._userAlreadyExist(fields.username)) {
      throw new ConflictError(this._conflictErrorMessage);
    }

    const userId = this.makeId.make();
    const profile = await this._createProfile(
      userId,
      new Name({ firstName: fields.username })
    );

    const user = new UserEntity(
      {
        id: userId,
        username: fields.username,
        password: fields.password,
        profileId: this.makeId.create(profile.id),
        email: new Email(fields.email),
        createdAt: fields.createdAt,
        updatedAt: fields.updatedAt,
      },
      this.validator,
      this.makeId
    );

    await this.userRepository.create(user);

    return {
      id: user.id.value.id,
      username: user.username,
      profileId: user.profileId.value.id,
      email: user.email.value,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  private async _userAlreadyExist(username: string): Promise<boolean> {
    try {
      const usecase = new FindByUserUsecase(this.userRepository);
      await usecase.execute({ username });
      return true;
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return false;
      }
      throw error;
    }
  }

  private async _createProfile(
    userId: Identifier,
    name: Name
  ): Promise<OutputCreateProfileDto> {
    const usecase = new CreateProfileUsecase(
      this.profileRepository,
      this.validator,
      this.makeId
    );
    return await usecase.execute({
      userId: userId.value.id,
      firstName: name.firstName,
      lastName: name.lastName,
    });
  }
}
