import { Body, Controller, Param, Patch } from '@nestjs/common';
import { AccountingClient } from './clients/accounting.client';
import { FinishReportAndCreateOfferDto } from './dto/finish-report-and-create-offer.dto';
import { DeliveryClient } from './clients/delivery.client';

@Controller('report')
export class ReportController {
  constructor(
    private readonly deliveryClient: DeliveryClient,
    private readonly accountingClient: AccountingClient,
  ) {}

  @Patch(':id')
  async finishReportAndCreateOffer(
    @Param('id') reportId: string,
    @Body() finishReportAndCreateOfferDto: FinishReportAndCreateOfferDto,
  ) {
    const resReport = await this.accountingClient
      .updateReportStatus(reportId, finishReportAndCreateOfferDto.orderId, true)
      .catch((err) => err);

    if (resReport instanceof Error) {
      return resReport;
    }

    const resDel = await this.deliveryClient.createOffer(
      finishReportAndCreateOfferDto.orderId,
    );

    if (resDel instanceof Error) {
      const resReport = await this.accountingClient
        .updateReportStatus(
          reportId,
          finishReportAndCreateOfferDto.orderId,
          false,
        )
        .catch((err) => err);
      return resReport;
    }
  }
}
