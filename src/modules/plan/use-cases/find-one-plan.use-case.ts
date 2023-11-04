import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { isUUID } from 'class-validator';
import { throwEx } from 'src/helpers/exception.helper';
import { ReturnPlanDto } from '../dtos/return-plan.dto';
import { Plan } from '../entities/plan.entity';
import { IPlanRepository } from '../plan.repository';

@Injectable()
export class FindOnePlanUseCase {
  constructor(
    @Inject('IPlanRepository')
    private readonly planRepositoty: IPlanRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async execute(id: string): Promise<any> {
    if (isUUID(id, 4)) {
      const result =
        (await this.planRepositoty.findById(id)) ??
        throwEx(new NotFoundException());

      return this.mapper.map(result, Plan, ReturnPlanDto);
    }

    throwEx(new NotFoundException());
  }
}
