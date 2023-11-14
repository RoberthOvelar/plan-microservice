import { DeepPartial, FindOptionsWhere } from 'typeorm';

export interface IRepository<Entity> {
  create(model: Entity): Promise<Entity>;
  findAll(): Promise<Entity[]>;
  findById(id: string): Promise<Entity>;
  findOneBy(
    where: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[],
    ...args: any[]
  ): Promise<Entity>;
  findBy(
    where:
      | FindOptionsWhere<Entity>
      | FindOptionsWhere<Entity>[]
      | Partial<Entity>,
    ...args: any[]
  ): Promise<Entity[]>;
  update(mergeIntoEntity: Entity, model: DeepPartial<Entity>): Promise<Entity>;
  remove(id: string): Promise<void>;
}
