import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Expose } from 'class-transformer';

export class BaseEntity {
  @PrimaryGeneratedColumn()
  @Expose()
  id!: number;

  @CreateDateColumn()
  @Expose()
  createdAt?: Date;

  @UpdateDateColumn()
  @Expose()
  updatedAt?: Date;
}
