import { Inject, Type } from '@nestjs/common';

export const InjectIRepository = (target: Type<any>) =>
  Inject(`IRepository<${target.name}>`);
