import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Book } from '../../book/entities/book.entity';
import { User } from '../../user/entities/user.entity';
import { JoinTable } from 'typeorm';

@Entity()
export class Library {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Book, (book) => book.library)
  books: Book[];

  @ManyToMany(() => User, (user) => user.libraries)
  @JoinTable()
  users: User[];
}
