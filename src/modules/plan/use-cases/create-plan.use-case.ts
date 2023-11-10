import { Inject, Injectable } from '@nestjs/common';
import { Plan } from '../entities/plan.entity';
import { ReturnPlanDto } from '../dtos/return-plan.dto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { CreatePlanDto } from '../dtos/create-plan.dto';
import { IRepository } from 'src/common/repository/irepository.repository';
import { InjectIRepository } from 'src/common/decorators/inject-repository.decorator';

@Injectable()
export class CreatePlanUseCase {
  constructor(
    @InjectIRepository(Plan)
    private readonly planRepositoty: IRepository<Plan>,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async execute(input: CreatePlanDto): Promise<ReturnPlanDto> {
    const entity = this.mapper.map(input, CreatePlanDto, Plan);
    const result = await this.planRepositoty.create(entity);

    return this.mapper.map(result, Plan, ReturnPlanDto);
  }
}
