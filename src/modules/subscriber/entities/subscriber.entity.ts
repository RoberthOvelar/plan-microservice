import { AutoMap } from '@automapper/classes';
import { Plan } from 'src/modules/plan/entities/plan.entity';
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Subscriber' })
export class Subscriber {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  @AutoMap()
  id: string;

  @Column()
  @AutoMap()
  userId: string;

  @Column()
  @AutoMap()
  planId: string;

  @ManyToOne(() => Plan)
  @JoinColumn()
  plan: Plan;
}
