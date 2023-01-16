import { ProfileModel } from "@profile/domain/repository/profile.repository";

export type InputCreateProfileDto = ProfileModel;

export type OutputCreateProfileDto = Omit<
  ProfileModel,
  "firstName" | "lastName" | "id"
> & { name: { firstName: string; lastName?: string }, id: string };
