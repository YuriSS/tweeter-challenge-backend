import { UserModel } from "@user/domain/repository/user.repository";

export type InputUserCreateDto = Omit<UserModel, "id">;

export type OutputUserCreateDto = Omit<UserModel, "password">;
