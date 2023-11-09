import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ISubscriptionRepository } from '../repositories/subscription.repository';
import { IStatusSubscriptionRepository } from '../repositories/status-subscription.repository';
import { Subscription } from '../entities/subscription.entity';
import { throwEx } from 'src/helpers/exception.helper';
import { IPlanRepository } from 'src/modules/plan/plan.repository';

@Injectable()
export class SubscribeInPlanUseCase {
  constructor(
    @Inject('ISubscriptionRepository')
    private readonly subRepositoty: ISubscriptionRepository,
    @Inject('IStatusSubscriptionRepository')
    private readonly statusRepositoty: IStatusSubscriptionRepository,
    @Inject('IPlanRepository')
    private readonly planRepositoty: IPlanRepository,
  ) {}
  async execute(userId: string, planId: string): Promise<Subscription> {
    const status = await this.statusRepositoty.findOneBy({
      name: 'Ativo',
    });

    const existingSubscription = await this.subRepositoty.findOneBy({
      userId: userId,
      status: status.id,
    });

    if (existingSubscription)
      throwEx(new BadRequestException('Você já possui uma inscrição ativa'));

    const plan = await this.planRepositoty.findById(planId);
    if (!plan) throwEx(new NotFoundException('Plano não existe'));

    const expiresAt = new Date();
    expiresAt.setMonth(expiresAt.getMonth() + plan.periodInMonths);

    const sub = new Subscription({
      userId,
      plan,
      status,
      expiresAt,
    });

    return await this.subRepositoty.create(sub);
  }
}
