import { IsString } from 'class-validator';

export class LabelCouponCreateDto {
  @IsString()
  label: string;
}
