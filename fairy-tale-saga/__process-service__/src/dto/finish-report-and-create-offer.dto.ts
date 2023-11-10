import { IsString } from 'class-validator';

export class FinishReportAndCreateOfferDto {
  @IsString()
  orderId: string;
}
