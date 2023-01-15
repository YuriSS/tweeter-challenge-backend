import { UserModel } from "@user/domain/repository/user.repository";

export interface InputUserFindDto {
  id: string;
}

export type OutputUserFindDto = UserModel;
