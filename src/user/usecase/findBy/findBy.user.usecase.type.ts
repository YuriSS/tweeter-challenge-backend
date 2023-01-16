import { UserEntity } from "@user/domain/entity/user";
import { UserModel } from "@user/domain/repository/user.repository";

export type InputFindByDto = Partial<UserEntity>;

export type OutputFindByDto = Omit<UserModel, "password">;
