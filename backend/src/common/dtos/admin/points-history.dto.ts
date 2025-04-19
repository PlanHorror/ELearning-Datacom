import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { PointsHistoryType } from 'src/common/enums';

export class PointsHistoryDto {
  @ApiProperty({
    description: 'Customer ID associated with this points history',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  customer_id: string;

  @ApiProperty({
    description: 'Type of points history record',
    enum: ['ADDED', 'SUBTRACTED'],
    example: 'ADDED',
  })
  @IsEnum(PointsHistoryType)
  @IsNotEmpty()
  type: PointsHistoryType;

  @ApiProperty({
    description: 'Points amount',
    example: 100,
  })
  @IsNumberString()
  @IsNotEmpty()
  points: number;

  @ApiProperty({
    description: 'Description of the points history event',
    example: 'Points added for referral program',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Date when the points history was created',
    example: '2023-10-01T12:00:00Z',
  })
  @IsDate()
  @IsNotEmpty()
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  created_at: Date;

  @ApiProperty({
    description: 'Date when the points history was updated',
    example: '2023-10-01T12:00:00Z',
  })
  @IsDate()
  @IsNotEmpty()
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  updated_at: Date;

  @ApiProperty({
    description: 'Execute this action or not',
    example: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  @Transform(({ value }) => value === 'true')
  execute: boolean;
}
