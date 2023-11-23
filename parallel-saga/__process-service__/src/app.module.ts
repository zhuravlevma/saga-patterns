import { Module } from '@nestjs/common';
import { WarehouseController } from './warehouse.controller';
import { WarehouseClient } from './clients/warehouse.client';
import { AccountingClient } from './clients/accounting.client';
import { DeliveryClient } from './clients/delivery.client';
import { ReportController } from './report.controller';
import { DeliveryController } from './delivery.controller';

@Module({
  imports: [],
  controllers: [WarehouseController, ReportController, DeliveryController],
  providers: [WarehouseClient, AccountingClient, DeliveryClient],
})
export class AppModule {}
