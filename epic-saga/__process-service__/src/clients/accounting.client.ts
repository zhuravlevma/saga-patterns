import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AccountingClient {
  createEmptyReport(orderId: string) {
    return axios.post(`localhost:3000/reports`, {
      orderId,
    });
  }

  updateReportStatus(reportId: string, orderId: string, isValid: boolean) {
    return axios.patch(`localhost:3000/reports/${reportId}`, {
      orderId,
      isValid,
    });
  }
}
