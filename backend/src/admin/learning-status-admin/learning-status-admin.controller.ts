import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JsonLearningStatusDto } from 'src/common/dtos/admin/json-learning-status.dto';
import { JsonTransformInterceptor } from 'src/common/interceptors/json.interceptor';
import { LearningStatusAdminService } from './learning-status-admin.service';
import { LearningStatus } from './entity/learning-status.entity';
import { FilterLearningStatusDto } from 'src/common/dtos/admin/filter-learning-status.dto';
import { LearningStatusDto } from 'src/common/dtos/admin';

@Controller('admin/learning-status')
export class LearningStatusAdminController {
  constructor(private learningStatusAdminService: LearningStatusAdminService) {}

  @Get()
  async getAllLearningStatus(): Promise<LearningStatus[]> {
    return this.learningStatusAdminService.getAllLearningStatus();
  }

  @Get('/find/:id')
  async getLearningStatusById(
    @Param('id') id: string,
  ): Promise<LearningStatus> {
    return this.learningStatusAdminService.getLearningStatusById(id);
  }

  @Get('filter')
  async filterLearningStatus(
    @Query() query: FilterLearningStatusDto,
  ): Promise<LearningStatus[]> {
    return this.learningStatusAdminService.filterLearningStatus(query);
  }

  @Post('/json')
  @UseInterceptors(
    FileInterceptor('file'),
    new JsonTransformInterceptor({ require: true, property: 'learningStatus' }),
  )
  createLearningStatusByJson(
    @Body() data: JsonLearningStatusDto,
    @UploadedFile('file') file: Express.Multer.File,
  ) {
    return this.learningStatusAdminService.createLearningStatusFromJsonService(
      data,
      file,
    );
  }

  @Post()
  createLearningStatus(
    @Body() data: LearningStatusDto,
  ): Promise<LearningStatus> {
    return this.learningStatusAdminService.createLearningStatusService(data);
  }

  @Patch(':id')
  async updateLearningStatus(
    @Param('id') id: string,
    @Body() data: LearningStatusDto,
  ): Promise<LearningStatus> {
    return this.learningStatusAdminService.updateLearningStatusService(
      data,
      id,
    );
  }

  @Delete(':id')
  async deleteLearningStatus(@Param('id') id: string) {
    return this.learningStatusAdminService.deleteLearningStatusService(id);
  }
}
