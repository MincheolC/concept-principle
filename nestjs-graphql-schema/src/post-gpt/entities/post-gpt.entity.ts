import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Post } from '../../post/entities/post.entity';

@Entity()
export class PostGpt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  gptModel: string;

  @ManyToOne(() => Post, (post) => post.postGpts, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  post: Post;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
