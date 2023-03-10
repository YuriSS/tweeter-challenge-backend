import { Identifier } from "@shared/domain/value_objects/uuid/uuid";

export interface Repository<Entity, Model> {
  create(entity: Entity): Promise<void>;
  update(entity: Partial<Entity> & { id: Identifier }): Promise<void>;
  find(id: Identifier): Promise<Model>;
  findBy(params: Partial<Entity>): Promise<Model>;
  findAll(): Promise<Model[]>;
}
