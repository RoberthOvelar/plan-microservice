import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectIRepository } from 'src/common/decorators/inject-repository.decorator';
import { IRepository } from 'src/common/repository/irepository.repository';
import { throwEx } from 'src/helpers/exception.helper';
import { Plan } from '../entities/plan.entity';

@Injectable()
export class DeletePlanUseCase {
  constructor(
    @InjectIRepository(Plan)
    private readonly planRepositoty: IRepository<Plan>,
  ) {}

  async execute(id: string): Promise<void> {
    (await this.planRepositoty.findById(id)) ??
      throwEx(new NotFoundException());
    this.planRepositoty.remove(id);
  }
}
