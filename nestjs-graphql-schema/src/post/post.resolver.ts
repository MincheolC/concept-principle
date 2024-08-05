import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PostService } from './post.service';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';

@Resolver('Post')
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation('createPost')
  async create(@Args('createPostInput') createPostInput: CreatePostInput) {
    return await this.postService.create(createPostInput);
  }

  @Query('post')
  async findAll() {
    return await this.postService.findAll();
  }

  @Query('post')
  async findOne(@Args('id') id: number) {
    return await this.postService.findOne(id);
  }

  @Mutation('updatePost')
  async update(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
    return await this.postService.update(updatePostInput.id, updatePostInput);
  }

  @Mutation('removePost')
  async remove(@Args('id') id: number) {
    return await this.postService.remove(id);
  }
}
