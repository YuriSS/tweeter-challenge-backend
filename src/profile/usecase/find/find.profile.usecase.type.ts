import { ProfileModel } from "@profile/domain/repository/profile.repository";

export interface InputFindProfileDto {
  id: string;
}

export type OutputFindProfileDto = Omit<
  ProfileModel,
  "firstName" | "lastName"
> & { name: { firstName: string; lastName: string } };
