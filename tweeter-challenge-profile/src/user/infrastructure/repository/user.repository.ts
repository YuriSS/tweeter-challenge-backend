import { Identifier } from "@shared/domain/value_objects/uuid/uuid";
import { UserEntity } from "@user/domain/entity/user";
import { UserModel, UserRepositoryContract } from "@user/domain/repository/user.repository";

export class UserRepository implements UserRepositoryContract {
  public async create(_: UserEntity): Promise<void> {
    throw new Error("Not implemented yet");
  }

  public async update(_: UserEntity): Promise<void> {
    throw new Error("Not implemented yet");

  }

  public async find(_: Identifier): Promise<UserModel> {
    throw new Error("Not implemented yet");

  }

  public findAll(): Promise<UserModel[]> {
    throw new Error("Not implemented yet");
  }
}
