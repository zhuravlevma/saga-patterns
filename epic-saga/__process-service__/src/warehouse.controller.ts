import { Body, Controller, Param, Patch } from '@nestjs/common';
import { WarehouseClient } from './warehouse.client';
import { ChangeOrderStatusToValidDto } from './dto/change-order-status-to-valid.dto';
import { AccountingClient } from './accounting.client';

@Controller('warehouse')
export class WarehouseController {
  constructor(
    private readonly warehouseClient: WarehouseClient,
    private readonly accountingClient: AccountingClient,
  ) {}

  @Patch(':id/order')
  async changeOrderStatusToValid(
    @Param('id') warehouseId: string,
    @Body() changeOrderStatusToValidDto: ChangeOrderStatusToValidDto,
  ) {
    const resultWh = await this.warehouseClient
      .changeOrderStatus(
        warehouseId,
        changeOrderStatusToValidDto.orderId,
        changeOrderStatusToValidDto.isValid,
      )
      .catch((err) => err);

    if (resultWh instanceof Error) {
      return resultWh;
    }

    const resultAcc = await this.accountingClient.createEmptyReport(
      changeOrderStatusToValidDto.orderId,
    );

    if (resultAcc instanceof Error) {
      const resultWh = await this.warehouseClient
        .changeOrderStatus(
          warehouseId,
          changeOrderStatusToValidDto.orderId,
          false,
        )
        .catch((err) => err);
      return resultWh;
    }
  }
}
