import { Module } from '@nestjs/common';
import { AccountAdminController } from './account-admin.controller';
import { AccountAdminService } from './account-admin.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/auth/entity/admin.entity';

@Module({
  controllers: [AccountAdminController],
  providers: [AccountAdminService],
  imports: [AuthModule, TypeOrmModule.forFeature([Admin])],
})
export class AccountAdminModule {}
