import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Book } from '../book/entities/book.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = new User();
    newUser.name = createUserDto.name;
    newUser.age = createUserDto.age;

    await this.userRepository.save(newUser);
  }

  async findAll() {
    return await this.userRepository.find({
      relations: ['book', 'libraries'],
    });
  }

  async findOne(id: number) {
    if (id === undefined) {
      return null;
    }
    const user = await this.userRepository.findOne({
      relations: ['book', 'libraries'],
      where: {
        id,
      },
    });

    if (user === null) {
      throw new NotFoundException('user with id ' + id + ' not found');
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (user === null) {
      throw new NotFoundException('User with id ' + id + ' not found');
    }

    if (updateUserDto.name) {
      user.name = updateUserDto.name;
    }
    if (updateUserDto.age) {
      user.age = updateUserDto.age;
    }

    await this.userRepository.save(user);
  }

  async updateUserBook(user: User, book: Book) {
    user.book = book;
    await this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (user === null) {
      throw new NotFoundException('user with id ' + id + ' not found');
    }
    await this.userRepository.remove(user);
  }

  async findByIds(userIds: number[]) {
    return await this.userRepository.find({
      where: {
        id: In(userIds),
      },
    });
  }
}
