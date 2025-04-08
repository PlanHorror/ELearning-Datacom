import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entity/customer.entity';
import { Admin } from './entity/admin.entity';
import { Company } from './entity/company.entity';
import { PassportModule } from '@nestjs/passport';
import { EmailModule } from 'src/email/email.module';
import { JwtAccessTokenStrategy } from './access-token.strategy';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { JwtRefreshTokenStrategy } from './refresh-token.strategy';
import { CustomerDelete } from './entity/customer-delete.entity';
import { CompanyDelete } from './entity/comany-delete.entity';
dotenv.config();
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Admin,
      Company,
      Customer,
      CustomerDelete,
      CompanyDelete,
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET!,
      signOptions: { expiresIn: '60m' },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    EmailModule,
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAccessTokenStrategy, JwtRefreshTokenStrategy],
  exports: [JwtAccessTokenStrategy, PassportModule, AuthService],
})
export class AuthModule {}
