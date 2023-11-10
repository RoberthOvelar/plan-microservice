import { Mapper, createMap } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable, Type } from '@nestjs/common';

export function ProfileFor<Entity, CreateDto, ReturnDto>(
  entity: Type<Entity>,
  createDto: Type<CreateDto>,
  returnDto: Type<ReturnDto>,
): Type<AutomapperProfile> {
  @Injectable()
  class GenericProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
      super(mapper);
    }

    override get profile() {
      return (mapper) => {
        createMap(mapper, entity, returnDto);
        createMap(mapper, createDto, entity);
      };
    }
  }
  return GenericProfile;
}
