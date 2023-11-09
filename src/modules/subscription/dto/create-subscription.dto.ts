import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubscriptionDto {
  @ApiProperty()
  @AutoMap()
  subscribedAt: Date;

  expiresAt: Date;

  userId: string;

  plan: number;

  status: number;
}
