import { Module } from '@nestjs/common';
import { PlanService } from './plan.service';
import { PlanController } from './plan.controller';
import { Plan } from './entities/plan.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { profileFor } from '../../profile/mapper.profile';
import { CreatePlanDto } from './dto/create-plan.dto';
import { ReturnPlanDto } from './dto/return-plan.dto';

@Module({
  imports: [TypeOrmModule.forFeature([Plan])],
  controllers: [PlanController],
  providers: [
    PlanService,
    profileFor<Plan, CreatePlanDto, ReturnPlanDto>(
      Plan,
      CreatePlanDto,
      ReturnPlanDto,
    ),
  ],
})
export class PlanModule {}
