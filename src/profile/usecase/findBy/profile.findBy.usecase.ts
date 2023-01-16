import { ProfileRepositoryContract } from "@profile/domain/repository/profile.repository";
import { InputProfileFindByDto, OutputProfileFindByDto } from "@profile/usecase/findBy/profile.findBy.usecase.type";

export class FindByProfileUsecase {
  public constructor(
    private profileRepository: ProfileRepositoryContract
  ) {}

  public execute(fields: InputProfileFindByDto): Promise<OutputProfileFindByDto> {
    const profileSequelizeModel = this.profileRepository.findBy(fields);
    return profileSequelizeModel;
  }
}
