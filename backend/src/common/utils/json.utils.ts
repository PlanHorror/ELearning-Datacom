import { v4 as uuidv4 } from 'uuid';
import * as path from 'node:path';
import * as fs from 'fs';
import { BadRequestException } from '@nestjs/common';

export function createJsonName(json: Express.Multer.File): string {
  const ext = path.extname(json.originalname);
  const name = path.basename(json.originalname, ext);
  const newName = `${name}-${uuidv4()}${ext}`;
  return newName;
}

export function saveJson(json: Express.Multer.File, path: string): void {
  try {
    fs.writeFileSync(path, json.buffer);
  } catch (error) {
    console.error('Error saving JSON:', error);
    throw new BadRequestException('Error saving JSON');
  }
}

export function removeJson(jsonPath: string): void {
  try {
    fs.unlinkSync(jsonPath);
  } catch (error) {
    console.error('Error removing JSON:', error);
    throw new BadRequestException('Error removing JSON');
  }
}
