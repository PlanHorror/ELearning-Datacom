import { forwardRef, Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entity/company.entity';
import { CompanyDelete } from './entity/comany-delete.entity';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService],
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([Company, CompanyDelete]),
  ],
  exports: [CompanyService],
})
export class CompanyModule {}
