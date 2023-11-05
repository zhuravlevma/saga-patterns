import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AccountingClient {
  createEmptyReport(orderId: string) {
    return axios.patch(`localhost:3000/reports`, {
      orderId,
    });
  }
}
