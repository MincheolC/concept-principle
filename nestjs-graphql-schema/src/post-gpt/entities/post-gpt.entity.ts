import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { Post } from '../../post/entities/post.entity';

@Entity()
@Index(['gptModel'])
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
