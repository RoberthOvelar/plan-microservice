import { DeepPartial, Repository } from 'typeorm';
import { IPlanRepository } from './plan.repository';
import { Plan } from './entities/plan.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PlanTypeOrmRepository implements IPlanRepository {
  constructor(@InjectRepository(Plan) private typeOrmRepo: Repository<Plan>) {}

  async create(model: Plan): Promise<Plan> {
    return await this.typeOrmRepo.save(model);
  }
  async findAll(): Promise<Plan[]> {
    return await this.typeOrmRepo.find();
  }
  async findById(id: string): Promise<Plan> {
    return await this.typeOrmRepo.findOneBy({ id });
  }
  async update(mergeIntoEntity: Plan, model: DeepPartial<Plan>): Promise<Plan> {
    this.typeOrmRepo.merge(mergeIntoEntity, model);
    return await this.typeOrmRepo.save(mergeIntoEntity);
  }
  async remove(id: string): Promise<void> {
    await this.typeOrmRepo.delete(id);
  }
}
