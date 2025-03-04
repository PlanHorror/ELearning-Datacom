import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

// Admin entity class
@Entity()
export class Admin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;
}
