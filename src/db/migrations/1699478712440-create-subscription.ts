import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateSubscription1699478712440 implements MigrationInterface {
  private table = new Table({
    name: 'Subscription',
    columns: [
      {
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        isUnique: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()',
      },
      {
        name: 'userId',
        type: 'uuid',
        isUnique: true,
      },
      {
        name: 'planId',
        type: 'uuid',
      },
      {
        name: 'statusId',
        type: 'uuid',
      },
      {
        name: 'subscribedAt',
        type: 'timestamp',
        default: 'now()',
      },
      {
        name: 'expiresAt',
        type: 'timestamp',
      },
    ],
    foreignKeys: [
      {
        referencedTableName: 'Plan',
        referencedColumnNames: ['id'],
        columnNames: ['planId'],
      },
      {
        referencedTableName: 'StatusSubscription',
        referencedColumnNames: ['id'],
        columnNames: ['statusId'],
      },
    ],
  });
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
