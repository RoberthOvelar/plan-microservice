import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectIRepository } from 'src/common/decorators/inject-repository.decorator';
import { IRepository } from 'src/common/repository/irepository.repository';
import { DeepPartial, Equal, LessThan } from 'typeorm';
import { StatusSubscription } from '../entities/status-subscription.entity';
import { Subscription } from '../entities/subscription.entity';

@Injectable()
export class CheckExpiredSubscriptionUseCase {
  constructor(
    @InjectIRepository(Subscription)
    private readonly subRepositoty: IRepository<Subscription>,
    @InjectIRepository(StatusSubscription)
    private readonly statusRepositoty: IRepository<StatusSubscription>,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_10AM)
  async changeSubscriptionStatus() {
    const [status, inscricoesExpiradas] = await Promise.all([
      this.statusRepositoty.findOneBy({ name: 'Expirado' }),
      this.getExpiredSubscriptions(),
    ]);

    const statusExpirado = <DeepPartial<Subscription>>{
      status: status.id,
    };

    inscricoesExpiradas.forEach(async (inscricao) => {
      await this.subRepositoty.update(inscricao, statusExpirado);
    });
  }

  async getExpiredSubscriptions(): Promise<Subscription[]> {
    const statusAtivo = await this.statusRepositoty.findOneBy({
      name: 'Ativo',
    });
    const dataAtual = new Date('2023-11-10T01:03:41.46');

    return await this.subRepositoty.findBy({
      expiresAt: LessThan(dataAtual),
      status: Equal(statusAtivo.id),
    });
  }
}
