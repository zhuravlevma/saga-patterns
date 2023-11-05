import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WarehouseClient {
  changeOrderStatus(warehouseId: string, orderId: string, isValid: boolean) {
    return axios.patch(
      `localhost:3001/warehouse/warehouses/${warehouseId}/orders/${orderId}`,
      {
        isValid,
      },
    );
  }
}
