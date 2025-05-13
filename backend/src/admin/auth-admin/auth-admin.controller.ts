import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthAdminService } from './auth-admin.service';
import { AccountAdminDto } from 'src/common/dtos/admin';
import { RefreshTokenGuard } from 'src/common/guards/refresh-token.guard';
import { GetUser } from 'src/common/decorators';
import { Admin } from 'src/auth/entity/admin.entity';

@Controller('admin/auth')
export class AuthAdminController {
  constructor(private authAdminService: AuthAdminService) {}

  @Post('signin')
  async signIn(
    @Body() data: AccountAdminDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return this.authAdminService.signIn(data);
  }

  @Get('refresh-token')
  @UseGuards(RefreshTokenGuard)
  refreshToken(@GetUser() admin: Admin): { accessToken: string } {
    return this.authAdminService.refreshToken(admin);
  }
}
