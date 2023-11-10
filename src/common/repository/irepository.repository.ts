import { DeepPartial } from 'typeorm';

export interface IRepository<Entity> {
  create(model: Entity): Promise<Entity>;
  findAll(): Promise<Entity[]>;
  findById(id: string): Promise<Entity>;
  findOneBy(model: Partial<Entity>, ...args: any[]);
  findBy(model: Partial<Entity>, ...args: any[]);
  update(mergeIntoEntity: Entity, model: DeepPartial<Entity>): Promise<Entity>;
  remove(id: string): Promise<void>;
}
