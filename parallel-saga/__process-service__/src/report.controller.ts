import { Body, Controller, Post } from '@nestjs/common';
import { FinishReportAndCreateOfferDto } from './dto/finish-report-and-create-offer.dto';
import { DeliveryClient } from './clients/delivery.client';

@Controller('report')
export class ReportController {
  constructor(private readonly deliveryClient: DeliveryClient) {}

  @Post(':id')
  async finishReportAndCreateOffer(
    @Body() finishReportAndCreateOfferDto: FinishReportAndCreateOfferDto,
  ) {
    /// call service#1
    /// call service#2
    /// call service#3
    /// don't intercept errors
    return this.deliveryClient.createOffer(
      finishReportAndCreateOfferDto.orderId,
    );
  }
}
