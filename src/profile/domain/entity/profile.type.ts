import { Name } from "@shared/domain/value_objects/name/name";
import { Identifier } from "@shared/domain/value_objects/uuid/uuid";

export interface ProfileEntityInput {
  userId: Identifier;
  name: Name;
  id?: Identifier;
  biography?: string;
  updatedAt?: Date;
  createdAt?: Date;
}

export type ProfileEntityFields = Required<Omit<ProfileEntityInput, "biography">> & { biography?: string };
