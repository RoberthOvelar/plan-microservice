import { StatusSubscription } from '../entities/status-subscription.entity';

export interface IStatusSubscriptionRepository {
  findAll(): Promise<StatusSubscription[]>;
  findOneBy(model: Partial<StatusSubscription>, ...args: any[]);
}
