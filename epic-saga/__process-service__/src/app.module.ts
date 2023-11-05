import { Module } from '@nestjs/common';
import { WarehouseController } from './warehouse.controller';
import { WarehouseClient } from './warehouse.client';
import { AccountingClient } from './accounting.client';

@Module({
  imports: [],
  controllers: [WarehouseController],
  providers: [WarehouseClient, AccountingClient],
})
export class AppModule {}
