import { Email } from "@shared/domain/value_objects/email/email";
import { Identifier } from "@shared/domain/value_objects/uuid/uuid";

export interface UserEntityInput {
  id?: Identifier;
  profileId: Identifier;
  username: string;
  password: string;
  email: Email;
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserEntityFields = Required<UserEntityInput>;
