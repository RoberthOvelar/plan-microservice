import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { isUUID } from 'class-validator';
import { IRepository } from 'src/common/repository/irepository.repository';
import { throwEx } from 'src/helpers/exception.helper';
import { ReturnPlanDto } from '../dtos/return-plan.dto';
import { Plan } from '../entities/plan.entity';

@Injectable()
export class FindOnePlanUseCase {
  constructor(
    @Inject('IRepository<Plan>')
    private readonly planRepositoty: IRepository<Plan>,
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
