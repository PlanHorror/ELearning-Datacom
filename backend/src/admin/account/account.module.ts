import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/auth/entity/admin.entity';

@Module({
  controllers: [AccountController],
  providers: [AccountService],
  imports: [AuthModule, TypeOrmModule.forFeature([Admin])],
})
export class AccountModule {}
