import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PostGpt } from './entities/post-gpt.entity';
import { Post } from '../post/entities/post.entity';

@Injectable()
export class PostGptService {
  private postGptRepository: Repository<PostGpt>;

  constructor(private dataSource: DataSource) {
    this.postGptRepository = dataSource.getRepository(PostGpt);
  }

  async createUsage(post: Post, gptModel: string) {
    const postGpt = await this.postGptRepository.create({
      gptModel,
      post,
    });
    return await this.postGptRepository.save(postGpt);
  }
}
