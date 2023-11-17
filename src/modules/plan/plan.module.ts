import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthCoreModule } from 'src/common/auth/AuthCoreModule.module';
import { ProfileFor } from 'src/common/profile/mapper.profile';
import { TypeOrmRepositoryFor } from 'src/common/repository/typeorm.repository';
import { CreatePlanDto } from './dtos/create-plan.dto';
import { ReturnPlanDto } from './dtos/return-plan.dto';
import { Plan } from './entities/plan.entity';
import { PlanController } from './plan.controller';
import { CreatePlanUseCase } from './use-cases/create-plan.use-case';
import { DeletePlanUseCase } from './use-cases/delete-plan.use-case';
import { FindAllPlanUseCase } from './use-cases/find-all-plan.use-case';
import { FindOnePlanUseCase } from './use-cases/find-one-plan.use-case';
import { UpdatePlanUseCase } from './use-cases/update-plan.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Plan]), AuthCoreModule],
  controllers: [PlanController],
  providers: [
    CreatePlanUseCase,
    FindAllPlanUseCase,
    FindOnePlanUseCase,
    UpdatePlanUseCase,
    DeletePlanUseCase,
    {
      provide: `IRepository<Plan>`,
      useClass: TypeOrmRepositoryFor(Plan),
    },
    ProfileFor<Plan, CreatePlanDto, ReturnPlanDto>(
      Plan,
      CreatePlanDto,
      ReturnPlanDto,
    ),
  ],
  exports: ['IRepository<Plan>'],
})
export class PlanModule {}
