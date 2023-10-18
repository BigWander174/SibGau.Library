import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { BookModule } from './book/book.module';
import { Book } from './book/entities/book.entity';
import { LibraryModule } from './library/library.module';
import { Library } from './library/entities/library.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        synchronize: true,
        entities: [User, Book, Library],
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    BookModule,
    LibraryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
