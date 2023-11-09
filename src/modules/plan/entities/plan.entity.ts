import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Plan' })
export class Plan {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  @AutoMap()
  @ApiProperty()
  id: string;

  @Column()
  @AutoMap()
  @ApiProperty()
  name: string;

  @Column()
  @AutoMap()
  @ApiProperty()
  description: string;

  @Column()
  @AutoMap()
  @ApiProperty()
  priceInCents: number;

  @Column()
  @AutoMap()
  @ApiProperty()
  periodInMonths: number;

  @Column()
  @AutoMap()
  @ApiProperty()
  advantage: string;
}
