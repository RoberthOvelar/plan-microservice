import { Module } from '@nestjs/common';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';
import { Subscription } from './entities/subscription.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscribeInPlanUseCase } from './use-cases/subscribe-in-plan.use-case';
import { SubscriptionTypeOrmRepository } from './repositories/subscription-typeorm.repository';
import { StatusSubscriptionTypeOrmRepository } from './repositories/status-subscription-typeorm.repository';
import { StatusSubscription } from './entities/status-subscription.entity';
import { PlanModule } from '../plan/plan.module';

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
      provide: 'ISubscriptionRepository',
      useClass: SubscriptionTypeOrmRepository,
    },
    {
      provide: 'IStatusSubscriptionRepository',
      useClass: StatusSubscriptionTypeOrmRepository,
    },
  ],
})
export class SubscriptionModule {}
