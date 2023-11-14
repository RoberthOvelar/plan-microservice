import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectIRepository } from 'src/common/decorators/inject-repository.decorator';
import { IRepository } from 'src/common/repository/irepository.repository';
import { throwEx } from 'src/helpers/exception.helper';
import { Plan } from 'src/modules/plan/entities/plan.entity';
import { StatusSubscription } from '../entities/status-subscription.entity';
import { Subscription } from '../entities/subscription.entity';

@Injectable()
export class SubscribeInPlanUseCase {
  constructor(
    @InjectIRepository(Subscription)
    private readonly subRepositoty: IRepository<Subscription>,
    @InjectIRepository(StatusSubscription)
    private readonly statusRepositoty: IRepository<StatusSubscription>,
    @InjectIRepository(Plan)
    private readonly planRepositoty: IRepository<Plan>,
  ) {}
  async execute(planId: string): Promise<Subscription> {
    const userId = 'e8136b8b-9105-41a2-bfdb-60560540178c';

    const status = await this.statusRepositoty.findOneBy({
      name: 'Ativo',
    });

    const existingSubscription = await this.subRepositoty.findOneBy({
      userId: userId,
      status: status,
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
