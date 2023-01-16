import { ProfileEntity } from "@profile/domain/entity/profile";
import { Repository } from "@shared/domain/repositories/repostory";
import { ProfileEntityInput } from "@profile/domain/entity/profile.type";

export interface ProfileRepositoryContract extends Repository<ProfileEntity, ProfileModel> {}

interface ProfileExcludedModel {
  id?: string;
  userId: string;
  firstName: string;
  lastName?: string;
}

export type ProfileModel = Omit<ProfileEntityInput, "id" | "userId" | "name"> & ProfileExcludedModel;
