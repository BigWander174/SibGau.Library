import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { In, Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,

    private userRepository: UserService,
  ) {}
  async create(createBookDto: CreateBookDto) {
    if (!createBookDto.title) {
      throw new BadRequestException('`title` field is null');
    }
    const book = this.bookRepository.create({ title: createBookDto.title });
    if (createBookDto.userId) {
      const userFromDb = await this.userRepository.findOne(
        createBookDto.userId,
      );

      if (userFromDb === null) {
        throw new NotFoundException(
          'user with id' + createBookDto.userId + ' not found',
        );
      }
      book.user = userFromDb;
      await this.userRepository.updateUserBook(userFromDb, book);
    }

    await this.bookRepository.save(book);
  }

  async findByIds(ids: number[]) {
    return await this.bookRepository.find({
      where: {
        id: In(ids),
      },
    });
  }

  async findAll(): Promise<Book[]> {
    return await this.bookRepository.find({
      relations: ['user', 'library'],
    });
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.bookRepository.findOne({
      where: { id },
      relations: ['user', 'library'],
    });

    if (book === null) {
      throw new NotFoundException('book with id ' + id + ' not found');
    }

    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const bookFromDb = await this.bookRepository.findOne({
      where: { id },
    });

    if (bookFromDb === null) {
      throw new NotFoundException('book with id ' + id + ' not found');
    }

    if (updateBookDto.title) {
      bookFromDb.title = updateBookDto.title;
    }

    if (updateBookDto.userId) {
      const user = await this.userRepository.findOne(updateBookDto.userId);
      if (user === null) {
        throw new NotFoundException('user with id ' + id + 'not found');
      }

      if (user.book) {
        throw new BadRequestException(
          'user with id ' + user.id + ' already have book',
        );
      }

      bookFromDb.user = user;

      await this.userRepository.updateUserBook(user, bookFromDb);
    }
    await this.bookRepository.save(bookFromDb);
  }

  async remove(id: number) {
    const bookToDelete = await this.bookRepository.findOne({
      where: { id },
    });

    if (bookToDelete === null) {
      throw new NotFoundException('book with id ' + id + ' not found');
    }

    await this.bookRepository.remove(bookToDelete);
  }
}
