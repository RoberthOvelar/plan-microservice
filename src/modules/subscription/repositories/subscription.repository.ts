import { DeepPartial } from 'typeorm';
import { Subscription } from '../entities/subscription.entity';

export interface ISubscriptionRepository {
  create(model: Subscription): Promise<Subscription>;
  findAll(): Promise<Subscription[]>;
  findById(id: string): Promise<Subscription>;
  findOneBy(model: Partial<Subscription>, ...args: any[]);
  findBy(model: Partial<Subscription>, ...args: any[]);
  update(
    mergeIntoEntity: Subscription,
    model: DeepPartial<Subscription>,
  ): Promise<Subscription>;
  remove(id: string): Promise<void>;
}
