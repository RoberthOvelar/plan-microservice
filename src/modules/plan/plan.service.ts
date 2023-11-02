import { Injectable } from '@nestjs/common';
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

  findOne(id: number) {
    return `This action returns a #${id} plan`;
  }

  update(id: number, updatePlanDto: UpdatePlanDto) {
    return `This action updates a #${id} plan`;
  }

  remove(id: number) {
    return `This action removes a #${id} plan`;
  }
}
