import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UpdateOfferDto } from './dtos/update-offer.dto';
import { UpdateOfferInPort } from './domain/ports/in/update-offer.in-port';
import { OfferEntity } from './domain/entities/offer.entity';
import { CreateOfferInPort } from './domain/ports/in/create-offer.in-port';
import { CreateOfferDto } from './dtos/create-offer.dto';

@ApiTags('delivery')
@Controller('/delivery/offers')
export class OfferController {
  constructor(
    private readonly updateOfferUseCase: UpdateOfferInPort,
    private readonly createOfferUseCase: CreateOfferInPort,
  ) {}

  @Post()
  createOffer(@Body() createOfferDto: CreateOfferDto) {
    return this.createOfferUseCase.execute({
      orderId: createOfferDto.orderId,
      name: 'Report with ' + createOfferDto.orderId,
    });
  }

  @ApiOkResponse({
    description: 'Saved offer with orders',
  })
  @Patch('/:offerId')
  async updateOrderStatus(
    @Param('offerId') offerId: string,
    @Body() updateOfferDto: UpdateOfferDto,
  ): Promise<OfferEntity> {
    return this.updateOfferUseCase.execute({
      offerId,
      deliverymanId: updateOfferDto.deliverymanId,
    });
  }
}
