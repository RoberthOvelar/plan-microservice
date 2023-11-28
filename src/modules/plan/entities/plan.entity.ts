import { AutoMap } from '@automapper/classes';
import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Plan' })
export class Plan {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  @AutoMap()
  id: string;

  @Column()
  @AutoMap()
  name: string;

  @Column()
  @AutoMap()
  description: string;

  @Column()
  @AutoMap()
  priceInCents: number;

  @Column()
  @AutoMap()
  periodInMonths: number;

  @Column()
  @AutoMap()
  advantage: string;
}
