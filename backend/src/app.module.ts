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
import { CouponLabelModule } from './coupon-label/coupon-label.module';
import { CouponUseageModule } from './coupon-useage/coupon-useage.module';
import { CouponFavouriteModule } from './coupon-favourite/coupon-favourite.module';
import { PointsHistoryModule } from './points-history/points-history.module';
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
    CouponUseageModule,
    CouponFavouriteModule,
    PointsHistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
