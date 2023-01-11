import { Identifier } from "@shared/domain/value_objects/uuid/uuid";

export interface Repository<T> {
  create(entity: T): Promise<void>;
  update(entity: T): Promise<void>;
  find(id: Identifier): Promise<T>;
  findAll(): Promise<T[]>;
}
