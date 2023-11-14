import { Plan } from 'src/modules/plan/entities/plan.entity';
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StatusSubscription } from './status-subscription.entity';

@Entity({ name: 'Subscription' })
export class Subscription {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id?: string;

  @Column()
  userId: string;

  @Column({ name: 'planId' })
  @ManyToOne(() => Plan)
  @JoinColumn()
  plan: Plan;

  @Column({ name: 'statusId' })
  @ManyToOne(() => StatusSubscription, { eager: true })
  @JoinColumn()
  status: StatusSubscription;

  @Column()
  subscribedAt?: Date;

  @Column()
  expiresAt: Date;

  constructor(props: {
    userId?: string;
    plan?: Plan;
    status?: StatusSubscription;
    expiresAt?: Date;
  }) {
    Object.assign(this, props);
  }
}
