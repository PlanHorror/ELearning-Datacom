import { Customer } from 'src/customer/entity/customer.entity';
import { Coupon } from 'src/coupon/entity/coupon.entity';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['customer', 'coupon'])
export class CouponFavourite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Customer, (customer) => customer.favourites, {
    onDelete: 'CASCADE',
    eager: true,
  })
  customer: Customer;

  @ManyToOne(() => Coupon, (coupon) => coupon.favourites, {
    onDelete: 'CASCADE',
    eager: true,
  })
  coupon: Coupon;

  @CreateDateColumn()
  created_at: Date;
}
