import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

export class JsonTransformInterceptor implements NestInterceptor {
  constructor(
    private readonly options: { require: boolean; property?: string } = {
      require: true,
      property: '',
    },
  ) {}

  // Convert the response to JSON
  convertToJson(file: Express.Multer.File): string {
    // Add "{ learningStatus": ' before parsing and add '}' at the end
    const jsonString = file.buffer.toString('utf-8');
    if (!this.options.property) {
      return jsonString;
    } else {
      return `{ "${this.options.property}": ${jsonString} }`;
    }
  }

  // Validate file type
  validateFileType(file: Express.Multer.File): boolean {
    // Check mimetype is application/json or not and extension is .json or not
    if (
      file.mimetype.match(/application\/json/) ||
      file.originalname.match(/\.json$/)
    ) {
      return true;
    } else {
      throw new BadRequestException('File type is not supported');
    }
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const req = context.switchToHttp().getRequest();
    if (!req.headers['content-type']?.includes('multipart/form-data')) {
      throw new BadRequestException('Request is not multipart');
    }
    const file = req.file;
    if (!file) {
      if (this.options.require) {
        throw new BadRequestException('File is required');
      }
      return next.handle();
    }
    this.validateFileType(file);
    try {
      const json = this.convertToJson(file);
      req.body = JSON.parse(json);
    } catch (error) {
      throw new BadRequestException('File is not valid JSON');
    }
    return next.handle();
  }
}
