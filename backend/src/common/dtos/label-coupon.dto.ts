import { IsNotEmpty, IsString } from 'class-validator';

export class LabelCouponCreateDto {
  @IsString()
  @IsNotEmpty()
  label: string;
}
