import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from '../user/dto/update-user.dto';

@ApiTags('books')
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @ApiOperation({ summary: 'create book' })
  @ApiBody({
    type: CreateBookDto,
    examples: {
      a: {
        value: {
          title: 'title',
          userId: 1,
        },
      },
    },
  })
  async create(@Body() createBookDto: CreateBookDto) {
    await this.bookService.create(createBookDto);
  }

  @Get()
  @ApiOperation({ summary: 'get all books' })
  findAll() {
    return this.bookService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'get book by id' })
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update book by id' })
  @ApiBody({
    type: UpdateUserDto,
    examples: {
      default: {
        value: {
          title: 'title',
          userId: null,
        },
      },
    },
  })
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(+id, updateBookDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete book by id' })
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }
}
