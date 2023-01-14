import { Validator } from "@shared/domain/validator/validator";
import { MakeIdentifier } from "@shared/domain/value_objects/uuid/uuid";
import { UserEntity } from "@user/domain/entity/user";
import { UserModel, UserRepositoryContract } from "@user/domain/repository/user.repository";

export type InputUserCreateDto = Omit<UserModel, "id" | "profileId">;

export type OutputUserCreateDto = UserModel;

export class CreateUserUsecase {
  public constructor(private userRepository: UserRepositoryContract, private validator: Validator, private makeId: MakeIdentifier) {}

  public async execute(fields: InputUserCreateDto): Promise<OutputUserCreateDto> {
    const user = new UserEntity({
      username: fields.username,
      password: fields.password,
      createdAt: fields.createdAt,
      updatedAt: fields.updatedAt,
    }, this.validator, this.makeId);

    await this.userRepository.create(user);

    return {
      id: user.id.value.id,
      username: user.username,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
