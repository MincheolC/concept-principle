import { Module } from '@nestjs/common';
import { PostGptService } from './post-gpt.service';

@Module({
  providers: [PostGptService],
  exports: [PostGptService],
})
export class PostGptModule {}
