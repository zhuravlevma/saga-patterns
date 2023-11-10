import { Body, Controller, Post } from '@nestjs/common';
import { DeliveryClient } from './clients/delivery.client';
import { TakeOfferAndAddToMan } from './dto/take-offer-and-add-to-man.dto';

@Controller('delivery/deliveryman')
export class DeliveryController {
  constructor(private readonly deliveryClient: DeliveryClient) {}

  @Post()
  async takeOfferAndAddToMan(
    @Body() takeOfferAndAddToMan: TakeOfferAndAddToMan,
  ) {
    /// call service#1
    /// call service#2
    /// call service#3
    /// don't intercept errors
    return this.deliveryClient.addOrderToDeliveryman(
      takeOfferAndAddToMan.deliverymanId,
      takeOfferAndAddToMan.orderId,
    );
  }
}
