import { Email } from "@shared/domain/value_objects/email/email";
import { Name } from "@shared/domain/value_objects/name/name";
import { Identifier } from "@shared/domain/value_objects/uuid/uuid";

export interface ProfileEntityInput {
  id?: Identifier;
  userId: Identifier;
  name: Name;
  email: Email;
  biography?: string;
  updatedAt?: Date;
  createdAt?: Date;
}

export type ProfileEntityFields = Required<ProfileEntityInput>;
