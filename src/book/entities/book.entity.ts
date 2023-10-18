import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { JoinColumn } from 'typeorm';
import { Library } from '../../library/entities/library.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToOne(() => User, (user) => user.book, { onDelete: 'SET NULL' })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Library, (library) => library.books)
  @JoinColumn()
  library: Library;
}
