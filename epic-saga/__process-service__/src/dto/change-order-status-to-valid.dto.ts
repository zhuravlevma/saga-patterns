import { IsBoolean, IsString } from 'class-validator';

export class ChangeOrderStatusToValidDto {
  @IsString()
  orderId: string;

  @IsBoolean()
  isValid: boolean;
}
