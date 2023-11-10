import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { IRepository } from './irepository.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Type } from '@nestjs/common';

export function TypeOrmRepositoryFor<Entity>(
  entity: Type<Entity>,
): Type<IRepository<Entity>> {
  @Injectable()
  class TypeOrmRepository implements IRepository<Entity> {
    constructor(
      @InjectRepository(entity)
      private readonly typeOrmRepo: Repository<Entity>,
    ) {}

    async create(model: Entity): Promise<Entity> {
      return await this.typeOrmRepo.save(model);
    }

    async findAll(): Promise<Entity[]> {
      return await this.typeOrmRepo.find();
    }

    async findById(id: string): Promise<Entity> {
      return await this.typeOrmRepo.findOneBy(<any>{ id });
    }

    async findOneBy(model: Partial<Entity>) {
      return await this.typeOrmRepo.findOneBy(<FindOptionsWhere<Entity>>model);
    }

    async findBy(model: Partial<Entity>) {
      return await this.typeOrmRepo.findBy(<FindOptionsWhere<Entity>>model);
    }

    async update(
      mergeIntoEntity: Entity,
      model: DeepPartial<Entity>,
    ): Promise<Entity> {
      this.typeOrmRepo.merge(mergeIntoEntity, model);
      return await this.typeOrmRepo.save(mergeIntoEntity);
    }

    async remove(id: string): Promise<void> {
      await this.typeOrmRepo.delete(id);
    }
  }
  return TypeOrmRepository;
}
