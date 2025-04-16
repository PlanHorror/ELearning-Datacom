import { Module } from '@nestjs/common';
import { CustomerDeletedController } from './customer-deleted.controller';
import { CustomerDeletedService } from './customer-deleted.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerDelete } from 'src/auth/entity/customer-delete.entity';

@Module({
  controllers: [CustomerDeletedController],
  providers: [CustomerDeletedService],
  imports: [AuthModule, TypeOrmModule.forFeature([CustomerDelete])],
})
export class CustomerDeletedModule {}
