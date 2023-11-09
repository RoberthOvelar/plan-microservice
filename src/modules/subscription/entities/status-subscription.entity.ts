import { AutoMap } from '@automapper/classes';
import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

export enum EnumStatusSubscription {
  active = 'ACTIVE',
  expired = 'EXPIRED',
}

@Entity({ name: 'StatusSubscription' })
export class StatusSubscription {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  @AutoMap()
  id?: string;

  @Column()
  @AutoMap()
  name: string;

  @Column()
  @AutoMap()
  enum: EnumStatusSubscription;
}
