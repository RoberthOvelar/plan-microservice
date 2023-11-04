import { Module } from '@nestjs/common';
import { PlanController } from './plan.controller';
import { Plan } from './entities/plan.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { profileFor } from '../../profile/mapper.profile';
import { CreatePlanDto } from './dtos/create-plan.dto';
import { ReturnPlanDto } from './dtos/return-plan.dto';
import { CreatePlanUseCase } from './use-cases/create-plan.use-case';
import { FindAllPlanUseCase } from './use-cases/find-all-plan.use-case';
import { FindOnePlanUseCase } from './use-cases/find-one-plan.use-case';
import { UpdatePlanUseCase } from './use-cases/update-plan.use-case';
import { PlanTypeOrmRepository } from './plan-typeorm.repository';
import { DeletePlanUseCase } from './use-cases/delete-plan.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Plan])],
  controllers: [PlanController],
  providers: [
    CreatePlanUseCase,
    FindAllPlanUseCase,
    FindOnePlanUseCase,
    UpdatePlanUseCase,
    DeletePlanUseCase,
    PlanTypeOrmRepository,
    {
      provide: 'IPlanRepository',
      useExisting: PlanTypeOrmRepository,
    },
    profileFor<Plan, CreatePlanDto, ReturnPlanDto>(
      Plan,
      CreatePlanDto,
      ReturnPlanDto,
    ),
  ],
})
export class PlanModule {}
