import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class CustomerDelete {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  old_id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  username: string;

  @Column()
  postal_code: string;

  @Column()
  prefecture: string;

  @Column()
  gender: string;

  @Column()
  dob: Date;

  @Column()
  points: number;

  @Column()
  created_at: Date;

  @Column()
  last_updated: Date;

  @Column()
  last_login: Date;

  @CreateDateColumn()
  deleted_at: Date;
}
