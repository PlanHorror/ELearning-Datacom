import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsString,
  IsUUID,
  Matches,
} from 'class-validator';

export class LearningStatusDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  lessonId: string;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  date: Date;

  @IsString()
  @Matches(/^\d+:[0-5]\d:[0-5]\d$/, {
    message: 'time must be in format h+:mm:ss',
  })
  @IsNotEmpty()
  time: string;

  @IsBoolean()
  @IsNotEmpty()
  @Transform(({ value }) => {
    return value ? true : false;
  })
  completion: boolean;
}
