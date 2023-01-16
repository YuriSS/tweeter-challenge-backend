import { UserRepositoryContract } from "@user/domain/repository/user.repository";
import { InputFindByDto, OutputFindByDto } from "@user/usecase/findBy/findBy.user.usecase.type";

export class FindByUserUsecase {
  public constructor(
    private userRepository: UserRepositoryContract
  ) {}

  public async execute(fields: InputFindByDto): Promise<OutputFindByDto> {
    const userSequelizeModel = await this.userRepository.findBy(fields);
    return {
      id: userSequelizeModel.id,
      profileId: userSequelizeModel.profileId,
      email: userSequelizeModel.email,
      username: userSequelizeModel.username,
      createdAt: userSequelizeModel.createdAt,
      updatedAt: userSequelizeModel.updatedAt
    };
  }
}
