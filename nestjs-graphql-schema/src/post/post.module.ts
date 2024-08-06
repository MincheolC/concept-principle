import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { PostGptModule } from '../post-gpt/post-gpt.module';

@Module({
  imports: [PostGptModule],
  providers: [PostResolver, PostService],
  exports: [PostService],
})
export class PostModule {}
