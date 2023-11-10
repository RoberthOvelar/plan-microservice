import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { isUUID } from 'class-validator';
import { throwEx } from 'src/helpers/exception.helper';
import { IRepository } from 'src/common/repository/irepository.repository';
import { Plan } from '../entities/plan.entity';

@Injectable()
export class DeletePlanUseCase {
  constructor(
    @Inject('IRepository<Plan>')
    private readonly planRepositoty: IRepository<Plan>,
  ) {}

  async execute(id: string): Promise<void> {
    if (isUUID(id, 4)) {
      (await this.planRepositoty.findById(id)) ??
        throwEx(new NotFoundException());
      this.planRepositoty.remove(id);
    } else {
      throwEx(new NotFoundException());
    }
  }
}
