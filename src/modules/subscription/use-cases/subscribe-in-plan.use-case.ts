import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Subscription } from '../entities/subscription.entity';
import { throwEx } from 'src/helpers/exception.helper';
import { IRepository } from 'src/common/repository/irepository.repository';
import { Plan } from 'src/modules/plan/entities/plan.entity';
import { StatusSubscription } from '../entities/status-subscription.entity';

@Injectable()
export class SubscribeInPlanUseCase {
  constructor(
    @Inject('IRepository<Subscription>')
    private readonly subRepositoty: IRepository<Subscription>,
    @Inject('IRepository<StatusSubscription>')
    private readonly statusRepositoty: IRepository<StatusSubscription>,
    @Inject('IRepository<Plan>')
    private readonly planRepositoty: IRepository<Plan>,
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
