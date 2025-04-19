import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerDelete } from 'src/auth/entity/customer-delete.entity';
import { CustomerDeletedEntityDto } from 'src/common/dtos/admin';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerDeletedAdminService {
  constructor(
    @InjectRepository(CustomerDelete)
    private customerDeletedRepository: Repository<CustomerDelete>,
  ) {}

  /*
   * Raw methods
   */

  // Get all deleted customers
  async getDeletedCustomers(): Promise<CustomerDelete[]> {
    return await this.customerDeletedRepository.find();
  }

  // Get deleted customer by id
  async getDeletedCustomerById(id: string): Promise<CustomerDelete> {
    if (!id) throw new BadRequestException('Not enough data provided');
    try {
      const customer = await this.customerDeletedRepository.findOneBy({ id });
      if (!customer) throw new NotFoundException('Customer not found');
      return customer;
    } catch (error) {
      throw new NotFoundException('Customer not found');
    }
  }

  // Get deleted customer by old_id
  async getDeletedCustomerByOldId(old_id: string): Promise<CustomerDelete[]> {
    if (!old_id) throw new BadRequestException('Not enough data provided');
    try {
      const customer = await this.customerDeletedRepository.find({
        where: { old_id },
      });
      return customer;
    } catch (error) {
      throw new NotFoundException('Customer not found');
    }
  }

  // Get deleted customer by email
  async getDeletedCustomerByEmail(email: string): Promise<CustomerDelete[]> {
    if (!email) throw new BadRequestException('Not enough data provided');
    const customer = await this.customerDeletedRepository.find({
      where: { email },
    });
    return customer;
  }

  // Create deleted customer
  async createDeletedCustomer(
    data: CustomerDeletedEntityDto,
  ): Promise<CustomerDelete> {
    try {
      const customer = this.customerDeletedRepository.create(data);
      return await this.customerDeletedRepository.save(customer);
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Error when creating customer');
    }
  }

  // Update deleted customer
  async updateDeletedCustomer(
    id: string,
    data: CustomerDeletedEntityDto,
  ): Promise<CustomerDelete> {
    try {
      return await this.customerDeletedRepository.save({
        id,
        ...data,
      });
    } catch (error) {
      throw new BadRequestException('Error when updating customer');
    }
  }

  // Delete deleted customer
  async deleteDeletedCustomer(id: string): Promise<void> {
    try {
      await this.customerDeletedRepository.delete(id);
    } catch (error) {
      throw new BadRequestException('Error when deleting customer');
    }
  }

  /*
   * Service methods
   */
  // Get customers
  async getDeletedCustomersService(
    id?: string,
    email?: string,
    old_id?: string,
  ): Promise<CustomerDelete[] | CustomerDelete> {
    if (
      (id && email && old_id) ||
      (id && email) ||
      (id && old_id) ||
      (email && old_id)
    ) {
      throw new BadRequestException('Not enough data provided');
    }
    if (id) return await this.getDeletedCustomerById(id);
    if (email) return await this.getDeletedCustomerByEmail(email);
    if (old_id) return await this.getDeletedCustomerByOldId(old_id);
    return await this.getDeletedCustomers();
  }

  // Create customer
  async createDeletedCustomerService(
    data: CustomerDeletedEntityDto,
  ): Promise<CustomerDelete> {
    if (!data) throw new BadRequestException('Not enough data provided');
    return await this.createDeletedCustomer(data);
  }

  // Update customer
  async updateDeletedCustomerService(
    id: string,
    data: CustomerDeletedEntityDto,
  ): Promise<CustomerDelete> {
    if (!id || !data) throw new BadRequestException('Not enough data provided');
    await this.getDeletedCustomerById(id);
    return await this.updateDeletedCustomer(id, data);
  }

  // Delete customer
  async deleteDeletedCustomerService(id: string): Promise<void> {
    if (!id) throw new BadRequestException('Not enough data provided');
    await this.getDeletedCustomerById(id);
    return await this.deleteDeletedCustomer(id);
  }
}
