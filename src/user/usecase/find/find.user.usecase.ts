import { MakeIdentifier } from "@shared/domain/value_objects/uuid/uuid";
import { UserRepositoryContract } from "@user/domain/repository/user.repository";
import { InputUserFindDto, OutputUserFindDto } from "@user/usecase/find/find.user.usecase.type";

export class FindUserUsecase {
  public constructor(private userRepository: UserRepositoryContract, private makeId: MakeIdentifier) {}

  public async execute(input: InputUserFindDto): Promise<OutputUserFindDto> {
    const user = await this.userRepository.find(this.makeId.create(input.id));
    return user;
  }
}
