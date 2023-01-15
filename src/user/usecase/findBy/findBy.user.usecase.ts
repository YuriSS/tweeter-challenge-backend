import { UserEntity } from "@user/domain/entity/user";
import { UserModel, UserRepositoryContract } from "@user/domain/repository/user.repository";

export type InputFindByDto = Partial<UserEntity>;

export type OutputFindByDto = UserModel;

export class FindByUserUsecase {
  public constructor(
    private userRepository: UserRepositoryContract
  ) {}

  public execute(fields: InputFindByDto): Promise<OutputFindByDto> {
    const userSequelizeModel = this.userRepository.findBy(fields);
    return userSequelizeModel;
  }
}
