import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { isUUID } from 'class-validator';
import { throwEx } from 'src/helpers/exception.helper';
import { IPlanRepository } from '../plan.repository';

@Injectable()
export class DeletePlanUseCase {
  constructor(
    @Inject('IPlanRepository')
    private readonly planRepositoty: IPlanRepository,
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
