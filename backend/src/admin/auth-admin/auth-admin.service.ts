import { BadRequestException, Injectable } from '@nestjs/common';
import { AccountAdminDto } from 'src/common/dtos/admin';
import * as bcrypt from 'bcrypt';
import { AccountAdminService } from '../account-admin/account-admin.service';
import { Role } from 'src/common/enums';
import { JwtService } from '@nestjs/jwt';
import { Admin } from 'src/auth/entity/admin.entity';

@Injectable()
export class AuthAdminService {
  constructor(
    private adminAccountService: AccountAdminService,
    private jwtService: JwtService,
  ) {}

  // Sign in method for admin
  async signIn(
    data: AccountAdminDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    if (!data) {
      throw new BadRequestException('Not enough data provided');
    }
    const { username, password } = data;
    const admin = await this.adminAccountService.getAdminByUsername(username);
    if (await bcrypt.compare(password, admin.password)) {
      const payload = {
        username: admin.username,
        role: Role.ADMIN,
      };
      const accessToken = this.jwtService.sign(payload);
      const refreshToken = this.jwtService.sign(payload, {
        secret: process.env.JWT_REFRESH_SECRET!,
        expiresIn: '7d',
      });
      return {
        accessToken,
        refreshToken,
      };
    } else {
      throw new BadRequestException('Invalid username or password');
    }
  }

  // Refresh token method for admin
  refreshToken(data: Admin): { accessToken: string } {
    const payload = {
      username: data.username,
      role: Role.ADMIN,
    };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
