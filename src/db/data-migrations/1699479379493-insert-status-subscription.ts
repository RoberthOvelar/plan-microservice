import {
  EnumStatusSubscription,
  StatusSubscription,
} from 'src/modules/subscription/entities/status-subscription.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertStatusSubscription1699479379493
  implements MigrationInterface
{
  private registerStatusSubscription = [
    {
      name: 'Ativo',
      enum: EnumStatusSubscription.active,
    },
    {
      name: 'Expirado',
      enum: EnumStatusSubscription.expired,
    },
  ];

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(StatusSubscription)
      .values(this.registerStatusSubscription)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from(StatusSubscription)
      .where('enum IN (:...enums)', {
        enums: [EnumStatusSubscription.active, EnumStatusSubscription.expired],
      })
      .execute();
  }
}
