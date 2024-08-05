import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from './entities/post.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class PostService {
  private postRepository: Repository<Post>;
  private userRepository: Repository<User>;

  constructor(private dataSource: DataSource) {
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

    const post = await this.postRepository.create({
      ...createPostInput,
      user,
    });
    return this.postRepository.save(post);
  }

  async findAll() {
    console.log('findAll');
    const posts = await this.postRepository.find();
    return posts || [];
  }

  async findPostsByUserId(userId: number) {
    return await this.postRepository.find({ where: { user: { id: userId } } });
  }

  async findOne(id: number) {
    console.log('findOne', id);
    return await this.postRepository.findOne({ where: { id } });
  }

  async update(id: number, updatePostInput: UpdatePostInput) {
    const post = await this.postRepository.preload({
      id,
      ...updatePostInput,
    });

    if (!post) {
      throw new Error('Post not found');
    }

    return this.postRepository.save(post);
  }

  async remove(id: number) {
    await this.postRepository.delete(id);
  }
}
