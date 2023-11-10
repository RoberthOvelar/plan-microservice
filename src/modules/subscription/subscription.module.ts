import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmRepositoryFor } from 'src/common/repository/typeorm.repository';
import { PlanModule } from '../plan/plan.module';
import { StatusSubscription } from './entities/status-subscription.entity';
import { Subscription } from './entities/subscription.entity';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';
import { SubscribeInPlanUseCase } from './use-cases/subscribe-in-plan.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([Subscription, StatusSubscription]),
    PlanModule,
  ],
  controllers: [SubscriptionController],
  providers: [
    SubscriptionService,
    SubscribeInPlanUseCase,
    {
      provide: `IRepository<Subscription>`,
      useClass: TypeOrmRepositoryFor<Subscription>(Subscription),
    },
    {
      provide: 'IRepository<StatusSubscription>',
      useClass: TypeOrmRepositoryFor<StatusSubscription>(StatusSubscription),
    },
  ],
})
export class SubscriptionModule {}
