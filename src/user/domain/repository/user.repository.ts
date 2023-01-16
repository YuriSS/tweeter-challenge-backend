import { Repository } from "@shared/domain/repositories/repostory";
import { UserEntity } from "@user/domain/entity/user";
import { UserEntityInput } from "@user/domain/entity/user.type";

export interface UserRepositoryContract extends Repository<UserEntity, UserModel> {}

interface UserExcludedModel {
  id: string;
  email: string;
  profileId?: string;
}

export type UserModel = Omit<UserEntityInput, "id" | "profileId" | "email"> & UserExcludedModel;
