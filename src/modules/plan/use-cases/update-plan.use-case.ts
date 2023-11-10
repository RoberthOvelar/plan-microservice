import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { isUUID } from 'class-validator';
import { IRepository } from 'src/common/repository/irepository.repository';
import { throwEx } from 'src/helpers/exception.helper';
import { ReturnPlanDto } from '../dtos/return-plan.dto';
import { UpdatePlanDto } from '../dtos/update-plan.dto';
import { Plan } from '../entities/plan.entity';
import { InjectIRepository } from 'src/common/decorators/inject-repository.decorator';

@Injectable()
export class UpdatePlanUseCase {
  constructor(
    @InjectIRepository(Plan)
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
