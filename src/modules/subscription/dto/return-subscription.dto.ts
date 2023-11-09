import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { Plan } from 'src/modules/plan/entities/plan.entity';
import { StatusSubscription } from '../entities/status-subscription.entity';

export class ReturnSubscriptionDto {
  @ApiProperty()
  @AutoMap()
  id: string;

  @ApiProperty()
  @AutoMap()
  userId: string;

  @ApiProperty()
  @AutoMap()
  plan: Plan;

  @ApiProperty()
  @AutoMap()
  status: StatusSubscription;

  @ApiProperty()
  @AutoMap()
  subscribedAt: Date;

  @ApiProperty()
  @AutoMap()
  expiresAt: Date;
}
