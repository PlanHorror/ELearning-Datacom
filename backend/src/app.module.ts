import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './email/email.module';
import * as fs from 'fs';
import { ScheduleModule } from '@nestjs/schedule';
import { CouponModule } from './coupon/coupon.module';
import { CouponLabelModule } from './coupon/coupon-label/coupon-label.module';
import { CouponUsageModule } from './coupon/coupon-usage/coupon-usage.module';
import { CouponFavouriteModule } from './coupon/coupon-favourite/coupon-favourite.module';
import { PointsHistoryModule } from './points-history/points-history.module';
import { AdminModule } from './admin/admin.module';
import { CustomerModule } from './customer/customer.module';
import { CompanyModule } from './company/company.module';
@Module({
  imports: [
    AuthModule,
    // Import the ScheduleModule
    ScheduleModule.forRoot(),
    // Import the ConfigModule
    ConfigModule.forRoot(),
    // Import the TypeOrmModule
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: 11679,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
      ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync('./ca.pem').toString(),
      },
    }),
    EmailModule,
    ConfigModule.forRoot(),
    CouponModule,
    CouponLabelModule,
    CouponUsageModule,
    CouponFavouriteModule,
    PointsHistoryModule,
    AdminModule,
    CustomerModule,
    CompanyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
