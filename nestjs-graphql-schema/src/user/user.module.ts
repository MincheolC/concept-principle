import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PostModule } from '../post/post.module';

@Module({
  imports: [PostModule],
  providers: [UserResolver, UserService],
})
export class UserModule {}
