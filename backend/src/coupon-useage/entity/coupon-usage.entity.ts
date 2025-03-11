import { Customer } from 'src/auth/entity/customer.entity';
import { CouponUsageStatus } from 'src/common/enums';
import { Coupon } from 'src/coupon/entity/coupon.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class CouponUsage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Coupon, (coupon) => coupon.coupon_usage, {
    onDelete: 'CASCADE',
  })
  coupon: Coupon;

  @ManyToOne(() => Customer, (customer) => customer.couponUsages, {
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
}
