import { Body, Controller, Param, Patch } from '@nestjs/common';
import { DeliveryClient } from './clients/delivery.client';
import { TakeOfferAndAddToMan } from './dto/take-offer-and-add-to-man.dto';

@Controller('delivery/offers')
export class DeliveryController {
  constructor(private readonly deliveryClient: DeliveryClient) {}

  @Patch(':id')
  async takeOfferAndAddToMan(
    @Param('id') offerId: string,
    @Body() takeOfferAndAddToMan: TakeOfferAndAddToMan,
  ) {
    const resOffer = await this.deliveryClient
      .updateOffer(
        offerId,
        takeOfferAndAddToMan.orderId,
        takeOfferAndAddToMan.deliverymanId,
      )
      .catch((err) => err);

    if (resOffer instanceof Error) {
      return resOffer;
    }

    const resDel = await this.deliveryClient
      .addOrderToDeliveryman(
        takeOfferAndAddToMan.deliverymanId,
        takeOfferAndAddToMan.orderId,
      )
      .catch((err) => err);

    if (resDel instanceof Error) {
      const resOffer = await this.deliveryClient
        .updateOffer(offerId, takeOfferAndAddToMan.orderId, null)
        .catch((err) => err);
      return resOffer;
    }
  }
}
