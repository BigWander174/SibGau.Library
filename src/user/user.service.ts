import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
      select: ['id', 'name', 'age'],
    });
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({
      select: ['name', 'age'],
      where: {
        id,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, {
      id: id,
      name: updateUserDto.name,
      age: updateUserDto.age,
    });
  }

  async remove(id: number) {
    const deleteUser = await this.userRepository.findOne({
      where: { id },
    });
    await this.userRepository.remove(deleteUser);
  }
}
