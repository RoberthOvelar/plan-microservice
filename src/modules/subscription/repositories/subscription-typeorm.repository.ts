import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { ISubscriptionRepository } from './subscription.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Subscription } from '../entities/subscription.entity';

@Injectable()
export class SubscriptionTypeOrmRepository implements ISubscriptionRepository {
  constructor(
    @InjectRepository(Subscription)
    private typeOrmRepo: Repository<Subscription>,
  ) {}

  async create(model: Subscription): Promise<Subscription> {
    return await this.typeOrmRepo.save(model);
  }

  async findAll(): Promise<Subscription[]> {
    return await this.typeOrmRepo.find();
  }

  async findById(id: string): Promise<Subscription> {
    return await this.typeOrmRepo.findOneBy({ id });
  }

  async findOneBy(model: Partial<Subscription>) {
    return await this.typeOrmRepo.findOneBy(
      <FindOptionsWhere<Subscription>>model,
    );
  }

  async findBy(model: Partial<Subscription>) {
    return await this.typeOrmRepo.findBy(<FindOptionsWhere<Subscription>>model);
  }

  async update(
    mergeIntoEntity: Subscription,
    model: DeepPartial<Subscription>,
  ): Promise<Subscription> {
    this.typeOrmRepo.merge(mergeIntoEntity, model);
    return await this.typeOrmRepo.save(mergeIntoEntity);
  }

  async remove(id: string): Promise<void> {
    await this.typeOrmRepo.delete(id);
  }
}
