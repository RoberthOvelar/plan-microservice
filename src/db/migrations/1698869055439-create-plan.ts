import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePlan1698869055439 implements MigrationInterface {
  private table = new Table({
    name: 'Plan',
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
        length: '255',
      },
      {
        name: 'description',
        type: 'text',
      },
      {
        name: 'price_in_cents',
        type: 'int',
      },
      {
        name: 'period',
        type: 'varchar',
        length: '255',
      },
      {
        name: 'advantage',
        type: 'text',
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
