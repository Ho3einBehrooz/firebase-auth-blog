import { Entity, Column } from 'typeorm';
import { Expose } from 'class-transformer';
import { BaseEntity } from '@common/entities/base.entity';
import { configService } from '@core/config/config.service';

@Entity({ database: configService.getDataBaseName() })
export class Posts extends BaseEntity {
  @Column()
  @Expose()
  title: string;

  @Column()
  @Expose()
  content: string;

  @Column({ nullable: true })
  @Expose()
  image?: string;
}
