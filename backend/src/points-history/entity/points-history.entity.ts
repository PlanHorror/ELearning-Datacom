import { Customer } from 'src/auth/entity/customer.entity';
import { PointsHistoryType } from 'src/common/enums';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class PointsHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: PointsHistoryType })
  type: PointsHistoryType;

  @Column()
  points: number;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Customer, (customer) => customer.couponHistories, {
    onDelete: 'CASCADE',
  })
  customer: Customer;
}
