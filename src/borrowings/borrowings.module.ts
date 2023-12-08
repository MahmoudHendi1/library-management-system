import { Module } from '@nestjs/common';
import { BorrowingsService } from './borrowings.service';
import { BorrowingsController } from './borrowings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Borrowing } from './entities/borrowing.entity';
import { BooksModule } from 'src/books/books.module';
import { BorrowersModule } from 'src/borrowers/borrowers.module';
import { Book } from 'src/books/entities/book.entity';
import { Borrower } from 'src/borrowers/entities/borrower.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Borrowing, Book, Borrower]),
    BooksModule,
    BorrowersModule,
  ],
  controllers: [BorrowingsController],
  providers: [BorrowingsService],
})
export class BorrowingsModule {}
