import { ProfileRepositoryContract } from "@profile/domain/repository/profile.repository";
import { Identifier } from "@shared/domain/value_objects/uuid/uuid";
import { InputFindProfileDto, OutputFindProfileDto } from "./find.profile.usecase.type";

export class FindProfileUsecase {
  public constructor(private profileRepository: ProfileRepositoryContract) {}

  public async execute(input: InputFindProfileDto): Promise<OutputFindProfileDto> {
    const id = new Identifier({ id: input.id });
    const profile = await this.profileRepository.find(id);

    return {
      id: profile.id,
      userId: profile.userId,
      name: {
        firstName: profile.firstName,
        lastName: profile.lastName
      },
      biography: profile.biography,
      updatedAt: profile.updatedAt,
      createdAt: profile.createdAt,
    }
  }
}
