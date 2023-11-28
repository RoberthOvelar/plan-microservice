import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectIRepository } from 'src/common/decorators/inject-repository.decorator';
import { Subscription } from '../entities/subscription.entity';
import { IRepository } from 'src/common/repository/irepository.repository';
import { StatusSubscription } from '../entities/status-subscription.entity';
import { DeepPartial, Equal } from 'typeorm';
import { throwEx } from 'src/helpers/exception.helper';

@Injectable()
export class CancelSubscriptionUseCase {
  constructor(
    @InjectIRepository(Subscription)
    private readonly subRepositoty: IRepository<Subscription>,
    @InjectIRepository(StatusSubscription)
    private readonly statusRepositoty: IRepository<StatusSubscription>,
  ) {}

  async execute(userId: string): Promise<void> {
    const statusAtivo = await this.statusRepositoty.findOneBy({
      name: 'Ativo',
    });

    const existingSubscription = await this.subRepositoty.findOneBy({
      userId: userId,
      status: Equal(statusAtivo.id),
    });

    if (!existingSubscription) {
      throwEx(
        new BadRequestException('Você não está cadastrado em nenhum plano'),
      );
    }

    const statusExpirado = await this.statusRepositoty.findOneBy({
      name: 'Expirado',
    });

    await this.subRepositoty.update(existingSubscription, <
      DeepPartial<Subscription>
    >{
      status: statusExpirado.id,
    });
  }
}
