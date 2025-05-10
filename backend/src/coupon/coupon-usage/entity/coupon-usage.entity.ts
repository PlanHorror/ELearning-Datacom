import { Customer } from 'src/customer/entity/customer.entity';
import { CouponUsageStatus } from 'src/common/enums';
import { Coupon } from 'src/coupon/entity/coupon.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class CouponUsage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Coupon, (coupon) => coupon.coupon_usage, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  coupon: Coupon;

  @ManyToOne(() => Customer, (customer) => customer.couponUsages, {
    eager: true,
    onDelete: 'CASCADE',
  })
  customer: Customer;

  @Column({
    type: 'enum',
    enum: CouponUsageStatus,
    default: CouponUsageStatus.UNUSED,
  })
  status: CouponUsageStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
