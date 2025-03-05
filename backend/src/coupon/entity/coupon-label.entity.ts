import { Admin } from 'src/auth/entity/admin.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CouponLabel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  label: string;

  @Column()
  created_at: Date;

  @Column()
  last_updated: Date;

  @ManyToOne((_type) => Admin, (admin) => admin.couponLabels, {
    onDelete: 'CASCADE',
    eager: false,
  })
  admin: Admin;
}
