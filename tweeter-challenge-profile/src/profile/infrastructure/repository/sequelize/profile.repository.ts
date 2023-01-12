import { ProfileEntity } from "@profile/domain/entity/profile"
import { ProfileRepository as ProfileRepositoryContract } from "@profile/domain/repository/profile.repository"
import { Identifier } from "@shared/domain/value_objects/uuid/uuid"
import { ProfileModel } from "@profile/infrastructure/repository/sequelize/profile.model";

export class ProfileRepository implements ProfileRepositoryContract {
  public async create(entity: ProfileEntity): Promise<void> {
    await ProfileModel.create({
      id: entity.id.value.id,
      userId: entity.userId.value.id,
      firstName: entity.name.firstName,
      lastName: entity.name.lastName,
      email: entity.email.value,
      biography: entity.biography,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }

  public async update(entity: ProfileEntity): Promise<void> {
    await ProfileModel.update({
      userId: entity.userId.value.id,
      firstName: entity.name.firstName,
      lastName: entity.name.lastName,
      email: entity.email.value,
      biography: entity.biography,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    }, {
      where: { id: entity.id.value.id }
    });
  }

  public async find(id: Identifier): Promise<ProfileEntity> {
    await ProfileModel.findOne({ where: { id: id.value.id }});
    throw new Error("Not implemented yet");
  }

  public findAll(): Promise<ProfileEntity[]> {
    throw new Error("Not implemented yet");
  }
}
