import { BadRequestException } from '@nestjs/common';

export function convertTimeToSeconds(time: string): number {
  try {
    const timeParts = time.split(':');
    if (timeParts.length !== 3) {
      throw new BadRequestException('Time must be in format h+:mm:ss');
    }
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    const seconds = parseInt(timeParts[2], 10);
    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
      throw new BadRequestException('Invalid time format');
    }
    return hours * 3600 + minutes * 60 + seconds;
  } catch (error) {
    throw new BadRequestException('Invalid time format');
  }
}
