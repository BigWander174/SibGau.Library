import {
  Column,
  Entity,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Book } from '../../book/entities/book.entity';
import { JoinColumn } from 'typeorm';
import { Library } from '../../library/entities/library.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @OneToOne(() => Book, (book) => book.user, {
    onDelete: 'SET NULL',
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  book: Book;

  @ManyToMany(() => Library, (library) => library.users)
  libraries: Library[];
}
