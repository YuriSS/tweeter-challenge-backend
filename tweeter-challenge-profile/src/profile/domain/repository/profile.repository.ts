import { ProfileEntity } from "@profile/domain/entity/profile";
import { Repository } from "@shared/domain/repositories/repostory";

export interface ProfileRepository extends Repository<ProfileEntity> {}
