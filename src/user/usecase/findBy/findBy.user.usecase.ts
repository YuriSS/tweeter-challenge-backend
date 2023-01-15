import { UserRepositoryContract } from "@user/domain/repository/user.repository";
import { InputFindByDto, OutputFindByDto } from "@user/usecase/findBy/findBy.user.usecase.type";

export class FindByUserUsecase {
  public constructor(
    private userRepository: UserRepositoryContract
  ) {}

  public execute(fields: InputFindByDto): Promise<OutputFindByDto> {
    const userSequelizeModel = this.userRepository.findBy(fields);
    return userSequelizeModel;
  }
}
