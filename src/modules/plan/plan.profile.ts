import { Mapper, createMap, forMember, ignore } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { Plan } from './entities/plan.entity';
import { ReturnPlanDto } from './dto/return-plan.dto';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';

@Injectable()
export class PlanProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, Plan, ReturnPlanDto);
      createMap(
        mapper,
        CreatePlanDto,
        Plan,
        forMember((dest) => dest.id, ignore()),
      );
      createMap(mapper, UpdatePlanDto, Plan);
    };
  }
}
