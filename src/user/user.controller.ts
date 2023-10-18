import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'create user' })
  @ApiBody({
    type: CreateUserDto,
    examples: {
      default: {
        value: {
          name: 'name',
          age: 0,
        },
      },
    },
  })
  create(@Body() createUserDto: CreateUserDto) {
    this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'get all users' })
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'get user by id' })
  async findOne(@Param('id') id: number) {
    return await this.userService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update user by id' })
  @ApiBody({
    type: UpdateUserDto,
    examples: {
      default: {
        value: {
          name: 'name',
          age: 0,
        },
      },
    },
  })
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete user by id' })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
