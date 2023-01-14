import { MakeIdentifier } from "@shared/domain/value_objects/uuid/uuid";
import { UserModel, UserRepositoryContract } from "@user/domain/repository/user.repository";

export interface InputUserFindDto {
  id: string;
}

export type OutputUserFindDto = UserModel;

export class FindUserUsecase {
  public constructor(private userRepository: UserRepositoryContract, private makeId: MakeIdentifier) {}

  public async execute(input: InputUserFindDto): Promise<OutputUserFindDto> {
    const user = await this.userRepository.find(this.makeId.create(input.id));

    return user;
  }
}
