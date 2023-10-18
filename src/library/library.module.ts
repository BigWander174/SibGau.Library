import { Module } from '@nestjs/common';
import { LibraryService } from './library.service';
import { LibraryController } from './library.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Library } from './entities/library.entity';
import { BookModule } from '../book/book.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Library]), BookModule, UserModule],
  controllers: [LibraryController],
  providers: [LibraryService],
})
export class LibraryModule {}
