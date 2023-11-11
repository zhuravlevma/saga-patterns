import { SaveDeliverymanOutPort } from '../ports/out/save-deliveryman.out-port';
import { FindDeliverymanByIdWithOrdersOutPort } from '../ports/out/find-deliveryman-by-id-with-orders.out-port';
import { DeliverymanEntity } from '../entities/deliveryman.entity';
import {
  ChangeDeliverymansStatusCommand,
  ChangeDeliverymansStatusInPort,
} from '../ports/in/change-deliverymans-status.in-port';

export class ChangeDeliverymansStatusInteractor
  implements ChangeDeliverymansStatusInPort
{
  constructor(
    private readonly findDeliverymanByIdWithOrdersPort: FindDeliverymanByIdWithOrdersOutPort,
    private readonly saveDeliverymanPort: SaveDeliverymanOutPort,
  ) {}

  async execute(
    changeDeliverymansStatusCommand: ChangeDeliverymansStatusCommand,
  ): Promise<DeliverymanEntity> {
    try {
      const deliverymanWithOrders =
        await this.findDeliverymanByIdWithOrdersPort.findDeliverymanByIdWithOrders(
          changeDeliverymansStatusCommand.deliverymanId,
        );

      deliverymanWithOrders.changeStatus(
        changeDeliverymansStatusCommand.isActive,
      );

      return await this.saveDeliverymanPort.save(deliverymanWithOrders);
    } catch (error) {
      return error.message;
    }
  }
}
