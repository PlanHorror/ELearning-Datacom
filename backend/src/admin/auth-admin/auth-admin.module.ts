import { Module } from '@nestjs/common';
import { AuthAdminService } from './auth-admin.service';
import { AuthAdminController } from './auth-admin.controller';
import { AccountAdminModule } from '../account-admin/account-admin.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [AuthAdminService],
  controllers: [AuthAdminController],
  imports: [
    AccountAdminModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET!,
      signOptions: { expiresIn: '60m' },
    }),
  ],
})
export class AuthAdminModule {}
