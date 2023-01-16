import { ProfileEntity } from "@profile/domain/entity/profile"
import { ProfileModel, ProfileRepositoryContract } from "@profile/domain/repository/profile.repository"
import { Identifier } from "@shared/domain/value_objects/uuid/uuid"
import { ProfileSequelizeModel } from "@profile/infrastructure/repository/sequelize/profile.repository.model";
import { ResourceNotFoundError } from "@shared/domain/errors/resource_not_found/resource_not_found.error";

export class ProfileRepository implements ProfileRepositoryContract {
  private scope = 'Profile';

  public async create(entity: ProfileEntity): Promise<void> {
    await ProfileSequelizeModel.create(ProfileRepositoryMapper.fromEntity(entity));
  }

  public async update(entity: ProfileEntity): Promise<void> {
    await ProfileSequelizeModel.update(ProfileRepositoryMapper.fromPartialEntity(entity), {
      where: { id: entity.id.value.id }
    });
  }

  public async find(id: Identifier): Promise<ProfileModel> {
    const value = id.value.id;
    const profileSequelizeModel = await ProfileSequelizeModel.findOne({ where: { id: value }});
    if (!profileSequelizeModel) {
      throw new ResourceNotFoundError({ field: 'id', value, scope: this.scope });
    }
    return ProfileRepositoryMapper.fromSequelize(profileSequelizeModel);
  }

  public async findBy(fields: Partial<ProfileEntity>): Promise<ProfileModel> {
    const where = ProfileRepositoryMapper.fromPartialEntity(fields);
    const profileSequelizeModel = await ProfileSequelizeModel.findOne({ where });
    if (!profileSequelizeModel) {
      const field = Object.keys(where).join(", ");
      const value = Object.values(where).join(", ");
      throw new ResourceNotFoundError({ field, value, scope: this.scope });
    }
    return ProfileRepositoryMapper.fromSequelize(profileSequelizeModel);
  }

  public findAll(): Promise<ProfileModel[]> {
    throw new Error("Not implemented yet");
  }
}

class ProfileRepositoryMapper {
  static fromSequelize(profileSequelizeModel: ProfileSequelizeModel): ProfileModel {
    return {
      id: profileSequelizeModel.id,
      userId: profileSequelizeModel.userId,
      firstName: profileSequelizeModel.firstName,
      lastName: profileSequelizeModel.lastName,
      biography: profileSequelizeModel.biography,
      createdAt: profileSequelizeModel.createdAt,
      updatedAt: profileSequelizeModel.updatedAt,
    } ;
  }

  static fromPartialEntity(profileEntity: Partial<ProfileEntity>): Partial<ProfileSequelizeModel> {
    return Object.entries({
      id: profileEntity.id?.value.id,
      userId: profileEntity.userId?.value.id,
      firstName: profileEntity.name?.firstName,
      lastName: profileEntity.name?.lastName,
      biography: profileEntity.biography,
      createdAt: profileEntity.createdAt,
      updatedAt: profileEntity.updatedAt,     
    }).reduce((result: Partial<ProfileSequelizeModel>, [key, value]) => (
      !value ? result : Object.assign(result, { [key]: value })
    ), {} as Partial<ProfileSequelizeModel>);
  }

  static fromEntity(profileEntity: ProfileEntity): ProfileSequelizeModel {
    return this.fromPartialEntity(profileEntity) as ProfileSequelizeModel;
  }
}
