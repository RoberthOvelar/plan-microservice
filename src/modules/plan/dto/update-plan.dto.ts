import { CreatePlanDto } from './create-plan.dto';
import { Transform } from 'class-transformer';
import { BadRequestException } from '@nestjs/common';
import { PartialType } from '@nestjs/swagger';

export class UpdatePlanDto extends PartialType(CreatePlanDto) {
  @Transform((value) => {
    if (value) throw new BadRequestException('ID não pode ser alterado');
  })
  id: string;
}
