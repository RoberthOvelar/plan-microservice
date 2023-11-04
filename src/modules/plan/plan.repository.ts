import { DeepPartial } from 'typeorm';
import { Plan } from './entities/plan.entity';

export interface IPlanRepository {
  create(model: Plan): Promise<Plan>;
  findAll(): Promise<Plan[]>;
  findById(id: string): Promise<Plan>;
  update(mergeIntoEntity: Plan, model: DeepPartial<Plan>): Promise<Plan>;
  remove(id: string): Promise<void>;
}
