import { IsUUID } from 'class-validator';

export class ValidUuid {
  @IsUUID(4)
  id: string;
}
