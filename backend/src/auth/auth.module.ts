import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '../customer/entity/customer.entity';
import { Admin } from './entity/admin.entity';
import { Company } from '../company/entity/company.entity';
import { PassportModule } from '@nestjs/passport';
import { EmailModule } from 'src/email/email.module';
import { JwtAccessTokenStrategy } from './access-token.strategy';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { JwtRefreshTokenStrategy } from './refresh-token.strategy';
import { CustomerDelete } from '../customer/entity/customer-delete.entity';
import { CompanyDelete } from '../company/entity/comany-delete.entity';
import { CustomerModule } from 'src/customer/customer.module';
import { CompanyModule } from 'src/company/company.module';
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
      signOptions: { expiresIn: '1d' },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    EmailModule,
    ConfigModule,
    forwardRef(() => CustomerModule),
    forwardRef(() => CompanyModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAccessTokenStrategy, JwtRefreshTokenStrategy],
  exports: [JwtAccessTokenStrategy, PassportModule, AuthService],
})
export class AuthModule {}
