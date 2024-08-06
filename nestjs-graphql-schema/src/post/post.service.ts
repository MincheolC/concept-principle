import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository, In, QueryRunner } from 'typeorm';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from './entities/post.entity';
import { User } from '../user/entities/user.entity';
import { PostGptService } from '../post-gpt/post-gpt.service';

@Injectable()
export class PostService {
  private postRepository: Repository<Post>;
  private userRepository: Repository<User>;

  constructor(
    private dataSource: DataSource,
    private readonly postGptService: PostGptService,
  ) {
    this.postRepository = dataSource.getRepository(Post);
    this.userRepository = dataSource.getRepository(User);
  }

  async create(createPostInput: CreatePostInput) {
    const user = await this.userRepository.findOne({
      where: { id: createPostInput.userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const post = await this.postRepository.create({
        ...createPostInput,
        user,
      });
      await this.postRepository.save(post);
      await this.postGptService.createUsage(post, 'gpt-4o');
      await queryRunner.commitTransaction();

      return await this.findOne(post.id);
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll() {
    const posts = await this.postRepository.find();
    return posts || [];
  }

  async findPostsByUserIds(userIds: number[]) {
    const posts = await this.postRepository.find({
      where: { user: { id: In(userIds) } },
      relations: ['user', 'postGpts'], // entity에 정의된 field값과 같아야함
    });

    return posts.map((post) => ({
      ...post,
      postGpts: post.postGpts || [],
    }));
  }

  async findOne(id: number) {
    return await this.postRepository.findOne({
      where: { id },
      relations: ['user', 'postGpts'],
    });
  }

  async update(id: number, updatePostInput: UpdatePostInput) {
    const post = await this.postRepository.preload({
      id,
      ...updatePostInput,
    });

    if (!post) {
      throw new Error('Post not found');
    }

    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await this.postRepository.save(post);
      await this.postGptService.createUsage(post, 'gpt-4o');
      await queryRunner.commitTransaction();

      return await this.findOne(post.id);
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: number) {
    await this.postRepository.delete(id);
  }
}
