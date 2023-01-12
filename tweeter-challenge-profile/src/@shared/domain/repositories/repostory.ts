import { Identifier } from "@shared/domain/value_objects/uuid/uuid";

export interface Repository<Entity> {
  create(entity: Entity): Promise<void>;
  update(entity: Entity): Promise<void>;
  find(id: Identifier): Promise<Entity>;
  findAll(): Promise<Entity[]>;
}
