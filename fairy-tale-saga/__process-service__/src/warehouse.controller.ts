import { Body, Controller, Post } from '@nestjs/common';
import { ChangeOrderStatusToValidDto } from './dto/change-order-status-to-valid.dto';
import { AccountingClient } from './clients/accounting.client';

@Controller('warehouse')
export class WarehouseController {
  constructor(private readonly accountingClient: AccountingClient) {}

  @Post()
  async changeOrderStatusToValid(
    @Body() changeOrderStatusToValidDto: ChangeOrderStatusToValidDto,
  ) {
    /// call service#1
    /// call service#2
    /// call service#3
    /// don't intercept errors
    return this.accountingClient.createEmptyReport(
      changeOrderStatusToValidDto.orderId,
    );
  }
}
