import { Email } from "@shared/domain/value_objects/email/email";
import { Name } from "@shared/domain/value_objects/name/name";
import { Identifier } from "@shared/domain/value_objects/uuid/uuid";

export interface ProfileEntityInput {
  id: Identifier;
  user: Identifier;
  name: Name;
  email: Email;
  biography?: string;
  tweets?: Identifier[];
}

export type ProfileEntityFields = Required<ProfileEntityInput>;
