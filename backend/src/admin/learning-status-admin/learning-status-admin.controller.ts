import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JsonLearningStatusDto } from 'src/common/dtos/admin/json-learning-status.dto';
import { JsonTransformInterceptor } from 'src/common/interceptors/json.interceptor';

@Controller('learning-status-admin')
export class LearningStatusAdminController {
  @Post()
  @UseInterceptors(
    FileInterceptor('file'),
    new JsonTransformInterceptor({ require: true, property: 'learningStatus' }),
  )
  createLearningStatus(@Body() data: JsonLearningStatusDto) {
    console.log(data);
    // Object.keys(data[0]).forEach((prop) => console.log(prop));
  }
}
