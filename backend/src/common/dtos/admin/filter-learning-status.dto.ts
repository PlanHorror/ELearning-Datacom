import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class FilterLearningStatusDto {
  @IsOptional()
  @IsNotEmpty()
  @IsUUID()
  customerId?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  lessonId?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  completion?: boolean;
}
