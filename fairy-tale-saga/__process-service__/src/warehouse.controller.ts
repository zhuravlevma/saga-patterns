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
    return this.accountingClient.createEmptyReport(
      changeOrderStatusToValidDto.orderId,
    );
  }
}
