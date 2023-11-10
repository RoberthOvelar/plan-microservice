import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectIRepository } from 'src/common/decorators/inject-repository.decorator';
import { IRepository } from 'src/common/repository/irepository.repository';
import { ReturnPlanDto } from '../dtos/return-plan.dto';
import { Plan } from '../entities/plan.entity';

@Injectable()
export class FindAllPlanUseCase {
  constructor(
    @InjectIRepository(Plan)
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
