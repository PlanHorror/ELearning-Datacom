import { Customer } from 'src/customer/entity/customer.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class LearningStatus {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne((_type) => Customer, (customer) => customer.learningStatus, {
    onDelete: 'CASCADE',
  })
  customer: Customer;

  @Column()
  lessonId: string;

  @Column()
  date: Date;

  @Column()
  time: number;

  @Column()
  completion: boolean;

  @Column()
  fileName: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  last_updated: Date;
}
