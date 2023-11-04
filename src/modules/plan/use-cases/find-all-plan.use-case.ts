import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Inject, Injectable } from '@nestjs/common';
import { ReturnPlanDto } from '../dtos/return-plan.dto';
import { Plan } from '../entities/plan.entity';
import { IPlanRepository } from '../plan.repository';

@Injectable()
export class FindAllPlanUseCase {
  constructor(
    @Inject('IPlanRepository')
    private readonly planRepositoty: IPlanRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async execute(): Promise<any> {
    const result = await this.planRepositoty.findAll();

    return {
      count: result.length,
      data: this.mapper.mapArray(result, Plan, ReturnPlanDto),
    };
  }
}
