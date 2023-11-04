import { Transform } from 'class-transformer';
import { BadRequestException } from '@nestjs/common';
import { ApiProperty, PartialType } from '@nestjs/swagger';

class _UpdateplanDto {
  @Transform((value) => {
    if (value) throw new BadRequestException('ID não pode ser alterado');
  })
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price_in_cents: number;

  @ApiProperty()
  period: string;

  @ApiProperty()
  advantage: string;
}

export class UpdatePlanDto extends PartialType(_UpdateplanDto) {}
