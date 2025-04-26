import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entity/customer.entity';
import { Repository } from 'typeorm';
import { CustomerDelete } from './entity/customer-delete.entity';
import { CustomerRawDto, CustomerUpdateDto } from 'src/common/dtos';
import * as bcrypt from 'bcrypt';
import { PointsHistoryType, Status } from 'src/common/enums';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(CustomerDelete)
    private customerDeleteRepository: Repository<CustomerDelete>,
  ) {}

  /*
   * Raw methods
   */

  // Get all customers
  async getAllCustomers(): Promise<Customer[]> {
    return await this.customerRepository.find({
      relations: ['favourites', 'couponUsages', 'pointsHistories'],
    });
  }

  // Get customer by id
  async getCustomerById(id: string): Promise<Customer> {
    if (!id) {
      throw new BadRequestException('Not enough data provided');
    }
    try {
      const customer = await this.customerRepository.findOne({
        where: { id: id },
        relations: ['favourites', 'couponUsages', 'pointsHistories'],
      });
      if (!customer) {
        throw new NotFoundException('Customer not found');
      }
      return customer;
    } catch (error) {
      throw new NotFoundException('Customer not found');
    }
  }

  // Get customer by email
  async getCustomerByEmail(email: string): Promise<Customer> {
    if (!email) {
      throw new BadRequestException('Not enough data provided');
    }
    try {
      const customer = await this.customerRepository.findOne({
        where: { email: email },
        relations: ['favourites', 'couponUsages', 'pointsHistories'],
      });
      if (!customer) {
        throw new NotFoundException('Customer not found');
      }
      return customer;
    } catch (error) {
      console.log('error', error);
      throw new NotFoundException('Customer not found');
    }
  }

  // Create customer
  async createCustomer(customer: CustomerRawDto): Promise<Customer> {
    try {
      const newCustomer = await this.customerRepository.save(customer);
      return newCustomer;
    } catch (error) {
      throw new BadRequestException('Error creating customer');
    }
  }

  // Update customer
  async updateCustomer(customer: Customer, id: string): Promise<Customer> {
    try {
      const updatedCustomer = await this.customerRepository.save({
        ...customer,
        id: id,
      });
      return updatedCustomer;
    } catch (error) {
      throw new BadRequestException('Error updating customer');
    }
  }

  // Delete customer
  async deleteCustomer(id: string): Promise<void> {
    try {
      await this.customerRepository.delete(id);
    } catch (error) {
      throw new BadRequestException('Error deleting customer');
    }
  }

  // Create delete customer
  async createDeleteCustomer(customer: Customer): Promise<CustomerDelete> {
    try {
      const newCustomerDelete =
        await this.customerDeleteRepository.save(customer);
      return newCustomerDelete;
    } catch (error) {
      throw new BadRequestException('Error creating customer delete record');
    }
  }

  // Update customer login time
  async updateCustomerLoginTime(id: string): Promise<Customer> {
    try {
      const customer = await this.getCustomerById(id);
      customer.last_login = new Date();
      return await this.customerRepository.save(customer);
    } catch (error) {
      throw new BadRequestException('Error updating customer login time');
    }
  }

  // Change points
  async changePoints(
    id: string,
    points: number,
    type: boolean,
  ): Promise<Customer> {
    try {
      const customer = await this.getCustomerById(id);
      if (type) {
        customer.points += points;
      } else {
        customer.points -= points;
      }
      return await this.customerRepository.save(customer);
    } catch (error) {
      throw new BadRequestException('Error changing customer points');
    }
  }

  // Update customer status
  async updateCustomerStatus(id: string, status: Status): Promise<Customer> {
    try {
      const customer = await this.getCustomerById(id);
      customer.status = status;
      return await this.customerRepository.save(customer);
    } catch (error) {
      throw new BadRequestException('Error updating customer status');
    }
  }

  // Check email exists
  async checkEmailExists(email: string): Promise<boolean> {
    try {
      const customer = await this.customerRepository.findOne({
        where: { email: email },
      });
      return !!customer;
    } catch (error) {
      throw new BadRequestException('Error checking email existence');
    }
  }

  /*
   * Service methods
   */

  // Get customer profile service
  async getCustomerProfileService(user: Customer): Promise<Customer> {
    if (!user) {
      throw new BadRequestException('Not enough data provided');
    }
    return await this.getCustomerById(user.id);
  }

  // Update customer service
  async updateCustomerService(
    user: Customer,
    data: CustomerUpdateDto,
  ): Promise<Customer> {
    if (!user || !data) {
      throw new BadRequestException('Not enough data provided');
    }
    const customer = await this.getCustomerById(user.id);
    if (data.old_password && data.new_password && data.confirm_password) {
      if (data.new_password !== data.confirm_password) {
        throw new BadRequestException(
          'New password and confirm password do not match',
        );
      }
      const isValidPassword = await bcrypt.compare(
        data.old_password,
        customer.password,
      );
      if (!isValidPassword) {
        throw new BadRequestException('Old password is incorrect');
      }
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(data.new_password, salt);
      return await this.updateCustomer(
        {
          password: hashedPassword,
          username: data.username,
          postal_code: data.postal_code,
          prefecture: data.prefecture,
          gender: data.gender,
          dob: data.dob,
          points: customer.points,
          last_updated: customer.last_updated,
          last_login: customer.last_login,
          status: customer.status,
          created_at: customer.created_at,
          couponUsages: customer.couponUsages,
          favourites: customer.favourites,
          pointsHistories: customer.pointsHistories,
          id: customer.id,
          email: customer.email,
        },
        user.id,
      );
    }
    return await this.updateCustomer({ ...customer, ...data }, user.id);
  }

  // Delete customer service
  async deleteCustomerService(user: Customer): Promise<void> {
    if (!user) {
      throw new BadRequestException('Not enough data provided');
    }
    const customer = await this.getCustomerById(user.id);
    await this.createDeleteCustomer(customer);
    await this.deleteCustomer(user.id);
  }
}
