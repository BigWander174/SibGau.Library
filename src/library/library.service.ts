import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLibraryDto } from './dto/create-library.dto';
import { UpdateLibraryDto } from './dto/update-library.dto';
import { Repository } from 'typeorm';
import { Library } from './entities/library.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BookService } from '../book/book.service';
import { UserService } from '../user/user.service';

@Injectable()
export class LibraryService {
  constructor(
    @InjectRepository(Library)
    private libraryRepository: Repository<Library>,
    private bookService: BookService,
    private userService: UserService,
  ) {}

  async create(createLibraryDto: CreateLibraryDto) {
    const books = await this.bookService.findByIds(createLibraryDto.bookIds);
    const users = await this.userService.findByIds(createLibraryDto.userIds);
    const library = new Library();
    library.name = createLibraryDto.name;
    library.books = books;
    library.users = users;

    await this.libraryRepository.save(library);
  }

  async findAll() {
    return await this.libraryRepository.find({
      relations: ['users', 'books'],
    });
  }

  async findOne(id: number) {
    return await this.libraryRepository.findOne({
      relations: ['books', 'users'],
      where: { id },
    });
  }

  async update(id: number, updateLibraryDto: UpdateLibraryDto) {
    const library = await this.libraryRepository.findOne({
      where: { id },
    });

    if (library === null) {
      throw new NotFoundException('library with id ' + id + ' not found');
    }

    if (updateLibraryDto.name !== null) {
      library.name = updateLibraryDto.name;
    }

    if (updateLibraryDto.bookIds) {
      library.books = await this.bookService.findByIds(
        updateLibraryDto.bookIds,
      );
    }

    if (updateLibraryDto.userIds) {
      library.users = await this.userService.findByIds(
        updateLibraryDto.userIds,
      );
    }

    await this.libraryRepository.save(library);
  }

  async remove(id: number) {
    const library = await this.libraryRepository.findOne({
      where: { id },
    });

    if (library === null) {
      throw new NotFoundException('library with id ' + id + ' not found');
    }
    await this.libraryRepository.remove(library);
  }
}
