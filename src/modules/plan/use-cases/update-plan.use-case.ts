import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { isUUID } from 'class-validator';
import { throwEx } from 'src/helpers/exception.helper';
import { ReturnPlanDto } from '../dtos/return-plan.dto';
import { UpdatePlanDto } from '../dtos/update-plan.dto';
import { Plan } from '../entities/plan.entity';
import { IRepository } from 'src/common/repository/irepository.repository';

@Injectable()
export class UpdatePlanUseCase {
  constructor(
    @Inject('IRepository<Plan>')
    private readonly planRepositoty: IRepository<Plan>,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async execute(id: string, input: UpdatePlanDto): Promise<ReturnPlanDto> {
    if (isUUID(id, 4)) {
      const result =
        (await this.planRepositoty.findById(id)) ??
        throwEx(new NotFoundException());

      const updatedEntity = await this.planRepositoty.update(result, input);
      return this.mapper.map(updatedEntity, Plan, ReturnPlanDto);
    }

    throwEx(new NotFoundException());
  }
}
