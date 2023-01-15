import { UserModel } from "@user/domain/repository/user.repository";

export type InputUserCreateDto = Omit<UserModel, "id" | "profileId">;

export type OutputUserCreateDto = UserModel;
