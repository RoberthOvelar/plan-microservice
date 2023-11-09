import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateStatusSubscription1699113423178
  implements MigrationInterface
{
  private table = new Table({
    name: 'StatusSubscription',
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
        name: 'name',
        type: 'varchar',
        length: '10',
        isNullable: true,
      },
      {
        name: 'enum',
        type: 'varchar',
        length: '10',
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
