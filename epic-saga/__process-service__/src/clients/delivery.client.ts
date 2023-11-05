import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class DeliveryClient {
  createOffer(orderId: string) {
    return axios.post(`localhost:3002/delivery/offers`, {
      orderId,
    });
  }

  updateOffer(offerId: string, orderId: string, deliverymanId: string | null) {
    return axios.patch(`localhost:3002/delivery/offers/${offerId}`, {
      orderId,
      deliverymanId,
    });
  }

  addOrderToDeliveryman(deliverymanId: string, orderId: string) {
    return axios.patch(
      `localhost:3002/delivery/deliverymans/${deliverymanId}/orders`,
      {
        orderId,
        deliverymanId,
      },
    );
  }
}
