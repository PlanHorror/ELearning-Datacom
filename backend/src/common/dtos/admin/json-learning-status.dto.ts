import { ValidateNested } from 'class-validator';
import { LearningStatusDto } from './learning-status.dto';
import { Type } from 'class-transformer';

export class JsonLearningStatusDto {
  @ValidateNested({ each: true })
  @Type(() => LearningStatusDto)
  learningStatus: LearningStatusDto[];
}
