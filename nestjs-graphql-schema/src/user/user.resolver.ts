import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Context,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation('createUser')
  async create(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.userService.create(createUserInput);
  }

  @Query('users')
  async findAll() {
    return await this.userService.findAll();
  }

  @Query('user')
  async findOne(@Args('id') id: number) {
    const user = await this.userService.findOne(id);
    if (user) {
      user.posts = user.posts || []; // posts가 null일 경우 빈 배열로 설정
    }
    return user;
  }

  @Mutation('updateUser')
  async update(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return await this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation('removeUser')
  async remove(@Args('id') id: number) {
    return await this.userService.remove(id);
  }

  @ResolveField('posts')
  async getPosts(@Parent() user, @Context() context) {
    return await context.loaders.postLoader.findPostsByUserIds.load(user.id);
  }
}
