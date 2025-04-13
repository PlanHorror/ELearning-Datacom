import { Module } from '@nestjs/common';
import { CustomerDeletedController } from './customer-deleted.controller';

@Module({
  controllers: [CustomerDeletedController]
})
export class CustomerDeletedModule {}
