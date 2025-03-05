import { PrimaryGeneratedColumn } from 'typeorm';

export class Coupon {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
