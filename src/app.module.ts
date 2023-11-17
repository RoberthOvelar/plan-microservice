import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard, ResourceGuard, RoleGuard } from 'nest-keycloak-connect';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KeycloakConfigModule } from './config/keycloak-config/keycloak-config.module';
import { PlanModule } from './modules/plan/plan.module';
import { SubscriptionModule } from './modules/subscription/subscription.module';
import { AuthCoreModule } from './common/auth/AuthCoreModule.module';

@Module({
  imports: [
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development'],
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      entities: ['dist/modules/**/*.entity.js'],
      migrationsTableName: 'Migrations',
      migrations: [
        'dist/db/migrations/**/*.js',
        'dist/db/data-migrations/**/*.js',
      ],
      migrationsRun: true,
    }),
    PlanModule,
    SubscriptionModule,
    KeycloakConfigModule,
    AuthCoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
