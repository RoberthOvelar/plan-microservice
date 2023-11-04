import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateSubscriber1699113423178 implements MigrationInterface {
  private table = new Table({
    name: 'Subscriber',
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
    ],
    foreignKeys: [
      {
        referencedTableName: 'Plan',
        referencedColumnNames: ['id'],
        columnNames: ['planId'],
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
