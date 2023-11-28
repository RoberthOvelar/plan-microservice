import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class ReturnPlanDto {
  @ApiProperty()
  @AutoMap()
  id: string;

  @ApiProperty()
  @AutoMap()
  name: string;

  @ApiProperty()
  @AutoMap()
  description: string;

  @ApiProperty()
  @AutoMap()
  priceInCents: number;

  @ApiProperty()
  @AutoMap()
  periodInMonths: number;

  @ApiProperty()
  @AutoMap()
  advantage: string;
}
