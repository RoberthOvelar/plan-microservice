import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Inject, Injectable } from '@nestjs/common';
import { ReturnPlanDto } from '../dtos/return-plan.dto';
import { Plan } from '../entities/plan.entity';
import { IRepository } from 'src/common/repository/irepository.repository';

@Injectable()
export class FindAllPlanUseCase {
  constructor(
    @Inject('IRepository<Plan>')
    private readonly planRepositoty: IRepository<Plan>,
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
