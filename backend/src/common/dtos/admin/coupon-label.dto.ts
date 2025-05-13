import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CouponLabelDto {
  @ApiProperty({
    description: 'Label name for categorizing coupons',
    example: 'Holiday Special',
  })
  @IsString()
  @IsNotEmpty()
  label: string;

  @ApiProperty({
    description: 'Creation date of the label',
    type: Date,
    example: '2023-01-01T00:00:00Z',
    required: false,
  })
  @IsDate()
  @IsNotEmpty()
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  created_at: Date;

  @ApiProperty({
    description: 'Last update date of the label',
    type: Date,
    example: '2023-01-01T00:00:00Z',
    required: false,
  })
  @IsDate()
  @IsNotEmpty()
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  last_updated: Date;
}
