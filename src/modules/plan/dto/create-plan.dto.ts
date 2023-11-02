import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreatePlanDto {
  @ApiProperty()
  @IsString()
  @AutoMap()
  name: string;

  @ApiProperty()
  @IsString()
  @AutoMap()
  description: string;

  @ApiProperty()
  @IsInt()
  @AutoMap()
  price_in_cents: number;

  @ApiProperty()
  @IsString()
  @AutoMap()
  period: string;

  @ApiProperty()
  @IsString()
  @AutoMap()
  advantage: string;
}
