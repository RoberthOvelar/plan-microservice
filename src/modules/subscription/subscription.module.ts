import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmRepositoryFor } from 'src/common/repository/typeorm.repository';
import { PlanModule } from '../plan/plan.module';
import { StatusSubscription } from './entities/status-subscription.entity';
import { Subscription } from './entities/subscription.entity';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';
import { SubscribeInPlanUseCase } from './use-cases/subscribe-in-plan.use-case';
import { CheckExpiredSubscriptionuseCase } from './use-cases/check-expired-subscription.use-case';
import { AuthCoreModule } from 'src/common/auth/AuthCoreModule.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Subscription, StatusSubscription]),
    PlanModule,
    AuthCoreModule,
  ],
  controllers: [SubscriptionController],
  providers: [
    SubscriptionService,
    SubscribeInPlanUseCase,
    CheckExpiredSubscriptionuseCase,
    {
      provide: `IRepository<Subscription>`,
      useClass: TypeOrmRepositoryFor(Subscription),
    },
    {
      provide: 'IRepository<StatusSubscription>',
      useClass: TypeOrmRepositoryFor(StatusSubscription),
    },
  ],
})
export class SubscriptionModule {}
