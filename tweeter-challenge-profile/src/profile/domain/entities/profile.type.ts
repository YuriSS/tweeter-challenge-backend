import { Identifier } from "@shared/domain/value_objects/uuid/uuid";

export interface ProfileEntityInput {
  id: Identifier;
  user: Identifier;
  name: string;
  email: string;
  biography?: string;
  tweets?: Identifier[];
}

export type ProfileEntityFields = Required<ProfileEntityInput>;
