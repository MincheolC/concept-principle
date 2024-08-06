import * as DataLoader from 'dataloader';
import { Injectable } from '@nestjs/common';
import { PostService } from '../../post/post.service';

@Injectable()
export class PostLoaderService {
  constructor(private readonly postService: PostService) {}

  public readonly findPostsByUserIds = new DataLoader<number, any>(
    async (userIds: number[]) => {
      const posts = await this.postService.findPostsByUserIds(userIds);
      const postsMap = posts.reduce((acc, post) => {
        if (!acc[post.user.id]) {
          acc[post.user.id] = [];
        }
        acc[post.user.id].push(post);
        return acc;
      }, {});
      return userIds.map((userId) => postsMap[userId] || []);
    },
    { cache: false },
  );
}
