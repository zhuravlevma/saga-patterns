import { IsString } from 'class-validator';

export class TakeOfferAndAddToMan {
  @IsString()
  orderId: string;

  @IsString()
  deliverymanId: string;
}
