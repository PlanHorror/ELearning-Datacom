import { Module } from '@nestjs/common';
import { AccountAdminController } from './account.controller';
import { AccountAdminService } from './account.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/auth/entity/admin.entity';

@Module({
  controllers: [AccountAdminController],
  providers: [AccountAdminService],
  imports: [AuthModule, TypeOrmModule.forFeature([Admin])],
})
export class AccountAdminModule {}
