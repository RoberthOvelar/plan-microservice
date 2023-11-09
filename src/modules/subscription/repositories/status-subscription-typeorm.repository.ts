import { FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { StatusSubscription } from '../entities/status-subscription.entity';
import { IStatusSubscriptionRepository } from './status-subscription.repository';

@Injectable()
export class StatusSubscriptionTypeOrmRepository
  implements IStatusSubscriptionRepository
{
  constructor(
    @InjectRepository(StatusSubscription)
    private typeOrmRepo: Repository<StatusSubscription>,
  ) {}
  async findAll(): Promise<StatusSubscription[]> {
    return await this.typeOrmRepo.find();
  }

  async findOneBy(
    model: Partial<StatusSubscription>,
  ): Promise<StatusSubscription> {
    return await this.typeOrmRepo.findOneBy(
      <FindOptionsWhere<StatusSubscription>>model,
    );
  }
}
