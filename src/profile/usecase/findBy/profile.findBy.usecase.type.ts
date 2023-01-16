import { ProfileEntity } from "@profile/domain/entity/profile";
import { ProfileModel } from "@profile/domain/repository/profile.repository";

export type InputProfileFindByDto = Partial<ProfileEntity>;

export type OutputProfileFindByDto = ProfileModel;
