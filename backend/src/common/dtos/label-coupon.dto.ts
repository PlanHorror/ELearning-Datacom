import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LabelCouponCreateDto {
  @ApiProperty({
    description: 'The label name for the coupon',
    example: 'Summer Sale',
  })
  @IsString()
  @IsNotEmpty()
  label: string;
}
