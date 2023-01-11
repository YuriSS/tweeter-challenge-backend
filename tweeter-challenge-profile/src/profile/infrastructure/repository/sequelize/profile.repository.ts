import { ProfileEntity } from "@profile/domain/entity/profile"
import { ProfileRepository as ProfileRepositoryContract } from "@profile/domain/repository/profile.repository"
import { Identifier } from "@shared/domain/value_objects/uuid/uuid"
import { ProfileModel } from "./profile.model";

export class ProfileRepository implements ProfileRepositoryContract {
  public async create(entity: ProfileEntity): Promise<void> {
    await ProfileModel.create({
      userId: entity.userId.value,
      firstName: entity.name.firstName,
      lastName: entity.name.lastName,
      email: entity.email.value,
      biography: entity.biography,
    });
  }

  public update(_: ProfileEntity): Promise<void> {
    throw new Error("Not implemented yet");
  }

  public find(_: Identifier): Promise<ProfileEntity> {
    throw new Error("Not implemented yet");
  }

  public findAll(): Promise<ProfileEntity[]> {
    throw new Error("Not implemented yet");
  }
}
