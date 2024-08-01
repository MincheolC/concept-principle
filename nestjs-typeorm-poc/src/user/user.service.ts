import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class UserService {
  private userRepository: Repository<User>;

  constructor(private readonly databaseService: DatabaseService) {
    this.initialize();
  }

  async initialize() {
    const dataSource = await this.databaseService.getDataSource('dev');
    this.userRepository = dataSource.getRepository(User);
  }

  async create(createUserDto: CreateUserDto | CreateUserInput) {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto | UpdateUserInput) {
    await this.userRepository.update(id, updateUserDto);
    return this.userRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    return this.userRepository.delete(id);
  }
}
