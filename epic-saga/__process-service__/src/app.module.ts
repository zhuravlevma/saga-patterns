import { Module } from '@nestjs/common';
import { WarehouseController } from './warehouse.controller';
import { WarehouseClient } from './warehouse.client';
import { AccountingClient } from './accounting.client';
import { DeliveryClient } from './delivery.client';

@Module({
  imports: [],
  controllers: [WarehouseController],
  providers: [WarehouseClient, AccountingClient, DeliveryClient],
})
export class AppModule {}
