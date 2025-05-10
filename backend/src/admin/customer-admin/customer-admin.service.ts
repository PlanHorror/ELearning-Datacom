import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/customer/entity/customer.entity';
import { CustomerEntityDto } from 'src/common/dtos/admin';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { PointsHistoryType } from 'src/common/enums';

@Injectable()
export class CustomerAdminService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  /*
   * Raw methods
   */

  // Get all customers from the database
  async getAllCustomers(): Promise<Customer[]> {
    return await this.customerRepository.find();
  }

  // Get a customer by id from the database
  async getCustomerById(id: string): Promise<Customer> {
    if (!id) {
      throw new BadRequestException('Not enough data provided');
    }
    try {
      const customer = await this.customerRepository.findOne({
        where: { id },
        relations: [
          'pointsHistories',
          'couponUsages',
          'favourites',
          'learningStatus',
        ],
      });
      if (!customer) {
        throw new NotFoundException('Customer not found');
      }
      return customer;
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Customer not found');
    }
  }

  // Get a customer by email from the database
  async getCustomerByEmail(email: string): Promise<Customer> {
    if (!email) {
      throw new BadRequestException('Not enough data provided');
    }
    try {
      return await this.customerRepository.findOneByOrFail({ email });
    } catch (error) {
      throw new NotFoundException('Customer not found');
    }
  }

  // Create a new customer in the database
  async createCustomer(data: CustomerEntityDto): Promise<Customer> {
    try {
      const customer = this.customerRepository.create(data);
      return await this.customerRepository.save(customer);
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException('Customer already exists');
      }
      throw new BadRequestException('Error creating customer');
    }
  }

  // Update a customer in the database
  async updateCustomer(data: CustomerEntityDto, id: string): Promise<Customer> {
    try {
      await this.customerRepository.update(id, data);
      return await this.customerRepository.findOneByOrFail({ id });
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException('Customer already exists');
      }
      console.log(error);
      throw new BadRequestException('Error updating customer');
    }
  }

  // Update customer points in the database
  async updateCustomerPoints(
    id: string,
    points: number,
    type: PointsHistoryType,
  ): Promise<Customer> {
    try {
      const customer = await this.getCustomerById(id);
      const newPoints =
        type === PointsHistoryType.ADD
          ? Number(customer.points) + Number(points)
          : Number(customer.points) - Number(points);
      return await this.customerRepository.save({
        id,
        points: newPoints,
      });
    } catch (error) {
      throw new NotFoundException('Customer not found');
    }
  }

  // Delete a customer from the database
  async deleteCustomer(id: string): Promise<void> {
    if (!id) {
      throw new BadRequestException('Not enough data provided');
    }
    try {
      await this.customerRepository.delete(id);
    } catch (error) {
      throw new NotFoundException('Customer not found');
    }
  }

  /*
   * Service methods
   */

  // Get customers from the database
  async getCustomersService(
    id?: string,
    email?: string,
  ): Promise<Customer[] | Customer> {
    if (id) {
      return await this.getCustomerById(id);
    } else if (email) {
      return await this.getCustomerByEmail(email);
    } else {
      return await this.getAllCustomers();
    }
  }

  // Create a customer in the database
  async createService(data: CustomerEntityDto): Promise<Customer> {
    if (!data) {
      throw new BadRequestException('Not enough data provided');
    }
    const { password, ...rest } = data;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return await this.createCustomer({
      ...rest,
      password: hashedPassword,
    });
  }

  // Update a customer in the database
  async updateService(data: CustomerEntityDto, id: string): Promise<Customer> {
    if (!data || !id) {
      throw new BadRequestException('Not enough data provided');
    }
    await this.getCustomerById(id); // Check if customer exists
    if (data.password) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(data.password, salt);
      data.password = hashedPassword;
    }
    return await this.updateCustomer(data, id);
  }

  // Delete a customer from the database
  async deleteService(id: string): Promise<void> {
    if (!id) {
      throw new BadRequestException('Not enough data provided');
    }
    await this.getCustomerById(id); // Check if customer exists
    return await this.deleteCustomer(id);
  }
}
