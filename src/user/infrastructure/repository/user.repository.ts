import { ResourceNotFoundError } from "@shared/domain/errors/resource_not_found/resource_not_found.error";
import { Identifier } from "@shared/domain/value_objects/uuid/uuid";
import { UserEntity } from "@user/domain/entity/user";
import { UserModel, UserRepositoryContract } from "@user/domain/repository/user.repository";
import { UserSequelizeModel } from "./user.repository.model";

export class UserRepository implements UserRepositoryContract {
  private scope = "User";

  public async create(entity: UserEntity): Promise<void> {
    await UserSequelizeModel.create({
      id: entity.id.value.id,
      username: entity.username,
      password: entity.password,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }

  public async update(_: UserEntity): Promise<void> {
    throw new Error("Not implemented yet");

  }

  public async find(id: Identifier): Promise<UserModel> {
    const value = id.value.id;
    const userSequelizeModel = await UserSequelizeModel.findOne({ where: { id: value }});
    if (!userSequelizeModel) {
      throw new ResourceNotFoundError({ field: 'id', value, scope: this.scope });
    }
    return UserRepositoryMapper.fromSequelize(userSequelizeModel);
  }

  public async findBy(fields: Partial<UserEntity>): Promise<UserModel> {
    const where = UserRepositoryMapper.fromPartialEntity(fields);
    const userSequelizeModel = await UserSequelizeModel.findOne({ where });
    if (!userSequelizeModel) {
      const field = Object.keys(where).join(", ");
      const value = Object.values(where).join(", ");
      throw new ResourceNotFoundError({ field, value, scope: this.scope });
    }
    return UserRepositoryMapper.fromSequelize(userSequelizeModel);
  }

  public findAll(): Promise<UserModel[]> {
    throw new Error("Not implemented yet");
  }
}

class UserRepositoryMapper {
  static fromSequelize(userSequelizeModel: UserSequelizeModel): UserModel {
    return {
      id: userSequelizeModel.id,
      username: userSequelizeModel.username,
      password: userSequelizeModel.password,
      profileId: userSequelizeModel.profileId,
      createdAt: userSequelizeModel.createdAt,
      updatedAt: userSequelizeModel.updatedAt,
    } ;
  }

  static fromPartialEntity(userEntity: Partial<UserEntity>): Partial<UserSequelizeModel> {
    return Object.entries({
      id: userEntity.id?.value.id,
      username: userEntity.username,
      password: userEntity.password,
      profileId: userEntity.profileId?.value.id,
      createdAt: userEntity.createdAt,
      updatedAt: userEntity.updatedAt,     
    }).reduce((result: Partial<UserSequelizeModel>, [key, value]) => (
      !value ? result : Object.assign(result, { [key]: value })
    ), {} as Partial<UserSequelizeModel>);
  }
}
