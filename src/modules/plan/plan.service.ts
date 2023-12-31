import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { Plan } from './entities/plan.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ReturnPlanDto } from './dto/return-plan.dto';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';

@Injectable()
export class PlanService {
  constructor(
    @InjectRepository(Plan)
    private readonly planRepositoty: Repository<Plan>,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async create(createPlanDto: CreatePlanDto): Promise<ReturnPlanDto> {
    const entity = this.mapper.map(createPlanDto, CreatePlanDto, Plan);
    const result = await this.planRepositoty.save(entity);
    return this.mapper.map(result, Plan, ReturnPlanDto);
  }

  async findAll(): Promise<unknown> {
    const result = await this.planRepositoty.find();
    return {
      count: result.length,
      data: this.mapper.mapArray(result, Plan, ReturnPlanDto),
    };
  }

  async findOne(id: string): Promise<ReturnPlanDto> {
    const result =
      (await this.planRepositoty.findOneBy({ id })) ??
      throwEx(new NotFoundException());
    return this.mapper.map(result, Plan, ReturnPlanDto);
  }

  async update(
    id: string,
    updatePlanDto: UpdatePlanDto,
  ): Promise<ReturnPlanDto> {
    const result =
      (await this.planRepositoty.findOneBy({ id })) ??
      throwEx(new NotFoundException());
    const updatedEntity = this.planRepositoty.merge(result, updatePlanDto); //TODO: Ignorar campos blank quando fazer merge
    const saveReturn = await this.planRepositoty.save(updatedEntity);
    return this.mapper.map(saveReturn, Plan, ReturnPlanDto);
  }

  async remove(id: string): Promise<void> {
    (await this.planRepositoty.findOneBy({ id })) ??
      throwEx(new NotFoundException());
    this.planRepositoty.delete(id);
  }
}
const throwEx = <Exception extends Error>(exception: Exception): never => {
  throw exception;
};
