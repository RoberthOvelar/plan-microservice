import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { isUUID } from 'class-validator';
import { InjectIRepository } from 'src/common/decorators/inject-repository.decorator';
import { IRepository } from 'src/common/repository/irepository.repository';
import { throwEx } from 'src/helpers/exception.helper';
import { ReturnPlanDto } from '../dtos/return-plan.dto';
import { Plan } from '../entities/plan.entity';

@Injectable()
export class FindOnePlanUseCase {
  constructor(
    @InjectIRepository(Plan)
    private readonly planRepositoty: IRepository<Plan>,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async execute(id: string): Promise<any> {
    const result =
      (await this.planRepositoty.findById(id)) ??
      throwEx(new NotFoundException());

    return this.mapper.map(result, Plan, ReturnPlanDto);
  }
}
