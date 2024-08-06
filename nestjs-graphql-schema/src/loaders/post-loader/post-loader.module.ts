import { Module } from '@nestjs/common';
import { PostLoaderService } from './post-loader.service';
import { PostModule } from '../../post/post.module';

@Module({
  imports: [PostModule],
  providers: [PostLoaderService],
  exports: [PostLoaderService],
})
export class PostLoaderModule {}
