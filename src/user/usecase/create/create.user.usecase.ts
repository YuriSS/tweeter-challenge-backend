import { ConflictError } from "@shared/domain/errors/conflict/conflict.error";
import { ResourceNotFoundError } from "@shared/domain/errors/resource_not_found/resource_not_found.error";
import { Validator } from "@shared/domain/validator/validator";
import { MakeIdentifier } from "@shared/domain/value_objects/uuid/uuid";
import { UserEntity } from "@user/domain/entity/user";
import { UserRepositoryContract } from "@user/domain/repository/user.repository";
import {
  InputUserCreateDto,
  OutputUserCreateDto,
} from "@user/usecase/create/create.user.usecase.type";
import { FindByUserUsecase } from "../findBy/findBy.user.usecase";

export class CreateUserUsecase {
  private _conflictErrorMessage = "Username already exist";

  public constructor(
    private userRepository: UserRepositoryContract,
    private validator: Validator,
    private makeId: MakeIdentifier
  ) {}

  public async execute(
    fields: InputUserCreateDto
  ): Promise<OutputUserCreateDto> {
    if (await this._userAlreadyExist(fields.username)) {
      throw new ConflictError(this._conflictErrorMessage);
    }

    const user = new UserEntity(
      {
        username: fields.username,
        password: fields.password,
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
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  private async _userAlreadyExist(username: string): Promise<boolean> {
    try {
      const usecase = new FindByUserUsecase(this.userRepository);
      await usecase.execute({ username });
      return true;
    }
    catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return false;
      }
      throw error;
    }
  }
}
