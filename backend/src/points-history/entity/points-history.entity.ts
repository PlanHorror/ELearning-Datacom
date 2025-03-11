import { Customer } from 'src/auth/entity/customer.entity';
import { CouponHistoryType } from 'src/common/enums';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class PointsHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: CouponHistoryType })
  type: CouponHistoryType;

  @Column()
  points: number;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Customer, (customer) => customer.couponHistories, {
    onDelete: 'CASCADE',
  })
  customer: Customer;
}
