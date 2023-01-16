import { ProfileEntity } from "@profile/domain/entity/profile";
import { ProfileRepositoryContract } from "@profile/domain/repository/profile.repository";
import { ConflictError } from "@shared/domain/errors/conflict/conflict.error";
import { ResourceNotFoundError } from "@shared/domain/errors/resource_not_found/resource_not_found.error";
import { Validator } from "@shared/domain/validator/validator";
import { Name } from "@shared/domain/value_objects/name/name";
import {
  Identifier,
  MakeIdentifier,
} from "@shared/domain/value_objects/uuid/uuid";
import { FindByProfileUsecase } from "../findBy/profile.findBy.usecase";
import {
  InputCreateProfileDto,
  OutputCreateProfileDto,
} from "./create.profile.usecase.type";

export class CreateProfileUsecase {
  public constructor(
    private profileRepository: ProfileRepositoryContract,
    private validator: Validator,
    private makeId: MakeIdentifier
  ) {}

  public async execute(
    fields: InputCreateProfileDto
  ): Promise<OutputCreateProfileDto> {
    if (await this._userAlreadyHaveProfile(fields)) {
      throw new ConflictError("User already have a profile");
    }

    const profile = new ProfileEntity(
      {
        userId: this.makeId.create(fields.userId),
        name: new Name({
          firstName: fields.firstName,
          lastName: fields.lastName,
        }),
        id: this._generateId(fields),
        biography: fields.biography,
        updatedAt: fields.createdAt,
        createdAt: fields.updatedAt,
      },
      this.validator,
      this.makeId
    );

    await this.profileRepository.create(profile);

    return {
      userId: profile.userId.value.id,
      name: {
        firstName: profile.name.firstName,
        lastName: profile.name.lastName,
      },
      id: profile.id.value.id,
      biography: profile.biography,
      updatedAt: profile.createdAt,
      createdAt: profile.updatedAt,
    };
  }

  private _generateId(fields: InputCreateProfileDto): Identifier | undefined {
    return !fields.id ? undefined : this.makeId.create(fields.id);
  }

  private async _userAlreadyHaveProfile(
    fields: InputCreateProfileDto
  ): Promise<boolean> {
    try {
      const usecase = new FindByProfileUsecase(this.profileRepository);
      await usecase.execute({ userId: this.makeId.create(fields.userId) });
      return true;
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return false;
      }
      throw error;
    }
  }
}
