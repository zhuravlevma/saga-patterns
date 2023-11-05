import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportPositionOrmEntity } from './dal/orm-entities/report-position.orm-entity';
import { ReportOrmEntity } from './dal/orm-entities/report.orm-entity';
import { ReportRepository } from './dal/report.repository';
import { CreateReportInteractor } from './domain/interactors/create-report.interactor';
import { FindReportByIdInteractor } from './domain/interactors/find-report-by-id.interactor';
import { UpdateReportInteractor } from './domain/interactors/update-report.interactor';
import { CreateReportInPort } from './domain/ports/in/create-report.in-port';
import { FindReportByIdInPort } from './domain/ports/in/find-report-by-id.in-port';
import { UpdateReportInPort } from './domain/ports/in/update-report.in-port';
import { FindPositionByIdOutPort } from './domain/ports/out/find-position-by-id.out-port';
import { FindReportByIdOutPort } from './domain/ports/out/find-report-by-id.out-port';
import { SaveReportOutPort } from './domain/ports/out/save-report.out-port';
import { ReportController } from './report.controller';
import { config } from './config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config().database.host,
      port: config().database.port,
      username: config().database.username,
      password: config().database.password,
      database: config().database.name,
      entities: [ReportPositionOrmEntity, ReportOrmEntity],
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([ReportOrmEntity, ReportPositionOrmEntity]),
  ],
  controllers: [ReportController],
  providers: [
    {
      provide: UpdateReportInPort,
      useFactory: (a, b) => new UpdateReportInteractor(a, b),
      inject: [FindReportByIdOutPort, SaveReportOutPort],
    },
    {
      provide: CreateReportInPort,
      useFactory: (a) => new CreateReportInteractor(a),
      inject: [SaveReportOutPort],
    },
    {
      provide: FindReportByIdInPort,
      useFactory: (a) => new FindReportByIdInteractor(a),
      inject: [FindReportByIdOutPort],
    },
    {
      provide: FindReportByIdOutPort,
      useClass: ReportRepository,
    },
    {
      provide: FindPositionByIdOutPort,
      useClass: ReportRepository,
    },
    {
      provide: SaveReportOutPort,
      useClass: ReportRepository,
    },
  ],
})
export class AccountingModule {}
