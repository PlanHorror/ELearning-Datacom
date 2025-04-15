import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from 'src/auth/entity/admin.entity';
import { AccountDto } from 'src/common/dtos/admin/account.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
  ) {}

  /*
   * Raw methods
   */

  // Get all admins from the database
  async getAllAdmins(): Promise<Admin[]> {
    return await this.adminRepository.find();
  }

  // Get a admin by id from the database
  async getAdminById(id: string): Promise<Admin> {
    if (!id) {
      throw new BadRequestException('Not enough data provided');
    }
    try {
      return await this.adminRepository.findOneByOrFail({ id });
    } catch (error) {
      throw new NotFoundException('Admin not found');
    }
  }

  // Get a admin by username from the database
  async getAdminByUsername(username: string): Promise<Admin> {
    if (!username) {
      throw new BadRequestException('Not enough data provided');
    }
    try {
      return await this.adminRepository.findOneByOrFail({ username });
    } catch (error) {
      throw new NotFoundException('Admin not found');
    }
  }

  // Create a new admin in the database
  async createAdmin(data: AccountDto): Promise<Admin> {
    try {
      const admin = this.adminRepository.create(data);
      return await this.adminRepository.save(admin);
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException('Admin already exists');
      }
      throw new BadRequestException('Error creating admin');
    }
  }

  // Update a admin in the database
  async updateAdmin(data: AccountDto, id: string): Promise<Admin> {
    try {
      return await this.adminRepository.save({
        ...data,
        id,
      });
    } catch (error) {
      throw new NotFoundException('Admin not found');
    }
  }

  // Delete a admin in the database
  async deleteAdmin(id: string): Promise<void> {
    try {
      await this.adminRepository.delete(id);
    } catch (error) {
      throw new NotFoundException('Admin not found');
    }
  }

  /*
   * Service methods
   */

  // Get admins from the database
  async getAdminsService(
    id?: string,
    username?: string,
  ): Promise<Admin[] | Admin> {
    if (id) {
      return await this.getAdminById(id);
    } else if (username) {
      return await this.getAdminByUsername(username);
    } else {
      return await this.getAllAdmins();
    }
  }

  // Create a new admin in the database
  async createService(data: AccountDto): Promise<Admin> {
    if (!data) {
      throw new BadRequestException('Not enough data provided');
    }
    const { username, password } = data;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return await this.createAdmin({
      username,
      password: hashedPassword,
    });
  }

  // Update a admin in the database
  async updateService(data: AccountDto, id: string): Promise<Admin> {
    if (!data) {
      throw new BadRequestException('Not enough data provided');
    }
    await this.getAdminById(id); // Check if admin exists
    const { password } = data;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return await this.updateAdmin(
      {
        ...data,
        password: hashedPassword,
      },
      id,
    );
  }

  // Delete a admin in the database
  async deleteService(id: string): Promise<void> {
    if (!id) {
      throw new BadRequestException('Not enough data provided');
    }
    await this.getAdminById(id); // Check if admin exists
    return await this.deleteAdmin(id);
  }
}
