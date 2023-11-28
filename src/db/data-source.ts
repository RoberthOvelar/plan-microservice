import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

export const dataSouceOptions: DataSourceOptions & SeederOptions = {
  type: <'mysql' | 'postgres'>process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['dist/modules/**/*.entity.js'],
  migrationsTableName: 'Migrations',
  migrations: ['dist/db/migrations/**/*.js', 'dist/db/data-migrations/**/*.js'],
};

const dataSource = new DataSource(dataSouceOptions);
export default dataSource;
