import { ProfileEntity } from "@profile/domain/entity/profile"
import { ProfileModel, ProfileRepositoryContract } from "@profile/domain/repository/profile.repository"
import { Identifier } from "@shared/domain/value_objects/uuid/uuid"
import { ProfileSequelizeModel } from "@profile/infrastructure/repository/sequelize/profile.repository.model";
import { ResourceNotFoundError } from "@shared/domain/errors/resource_not_found/resource_not_found.error";

export class ProfileRepository implements ProfileRepositoryContract {
  private scope = 'Profile';

  public async create(entity: ProfileEntity): Promise<void> {
    await ProfileSequelizeModel.create({
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
    await ProfileSequelizeModel.update({
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

  public async find(id: Identifier): Promise<ProfileModel> {
    const value = id.value.id;
    const profileSequelizeModel = await ProfileSequelizeModel.findOne({ where: { id: value }});
    if (!profileSequelizeModel) {
      throw new ResourceNotFoundError({ field: 'id', value, scope: this.scope });
    }
    return this.createProfileModel(profileSequelizeModel);
  }

  public findBy(): Promise<ProfileModel> {
    throw new Error("Not implemented yet");
  }

  public findAll(): Promise<ProfileModel[]> {
    throw new Error("Not implemented yet");
  }

  private createProfileModel(model: ProfileSequelizeModel): ProfileModel {
    return {
      id: model.id,
      userId: model.userId,
      firstName: model.firstName,
      lastName: model.lastName,
      email: model.email,
      biography: model.biography,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    }
  }
}
