import { Book } from 'src/books/entities/book.entity';
import { Borrower } from 'src/borrowers/entities/borrower.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Borrowing {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Book)
  @JoinColumn()
  book_id: number;

  @ManyToOne(() => Borrower)
  @JoinColumn()
  borrower_id: number;

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  checkOutDate: Date;

  @Column({ type: 'date', default: null })
  returnDate: Date;

  @Column({ type: 'date' })
  dueDate: Date;

  @Column({ default: false })
  returned: boolean;
}
