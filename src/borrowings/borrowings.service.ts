import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBorrowingDto } from './dto/create-borrowing.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { Borrowing } from './entities/borrowing.entity';
import { Borrower } from 'src/borrowers/entities/borrower.entity';
import {
  BOOK_AVAILABLITY_CONSTRAIN,
  Book,
} from 'src/books/entities/book.entity';

/**
 * Service responsible for managing borrowings in the library management system.
 */
@Injectable()
export class BorrowingsService {
  constructor(
    @InjectRepository(Borrowing)
    private borrowingRepository: Repository<Borrowing>,
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
    @InjectRepository(Borrower)
    private borrowersRepository: Repository<Borrower>,
    private dataSource: DataSource,
  ) {}

  async create(createBorrowingDto: CreateBorrowingDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      this.checkDueDateIsAfterCheckoutDate(
        createBorrowingDto.dueDate,
        createBorrowingDto.checkOutDate,
      );
      await this.findAndUpdateBook(queryRunner, createBorrowingDto.book_id);
      await this.createBorrowing(queryRunner, createBorrowingDto);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      this.handleBorrowingError(err);
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async return(id: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await this.borrowingRepository.findOneByOrFail({ id, returned: false });

      await queryRunner.manager
        .withRepository(this.borrowingRepository)
        .createQueryBuilder()
        .update(Borrowing)
        .set({ returned: true })
        .set({ returnDate: () => 'CURRENT_TIMESTAMP' })
        .where('returned = :returned', { returned: false })
        .where('id = :id', { id: id })
        .execute();

      await queryRunner.manager
        .withRepository(this.booksRepository)
        .createQueryBuilder()
        .update(Book)
        .set({ availableQuantity: () => 'availableQuantity + 1' })
        .where('id = :id', { id: id })
        .execute();

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      this.handleBorrowingError(err);
    } finally {
      await queryRunner.release();
    }
  }

  async findBorrowed(id: number) {
    const borrower = await this.borrowersRepository.findOneBy({ id });
    if (!borrower) {
      throw new NotFoundException(`Borrower with id ${id} not found`);
    }

    return await this.borrowingRepository.find({
      where: { borrower_id: id, returned: false },
    });
  }

  async findOverdue() {
    return await this.borrowingRepository
      .createQueryBuilder('borrowing')
      .innerJoinAndSelect('borrowing.book_id', 'book')
      .innerJoinAndSelect('borrowing.borrower_id', 'borrower')
      .where('borrowing.dueDate < :today', { today: new Date() })
      .andWhere('borrowing.returned = :returned', { returned: false })
      .getMany();
  }

  findAll() {
    return this.borrowingRepository.find();
  }

  private async createBorrowing(
    queryRunner: QueryRunner,
    createBorrowingDto: CreateBorrowingDto,
  ) {
    return await queryRunner.manager
      .withRepository(this.borrowingRepository)
      .save(createBorrowingDto);
  }

  private async findAndUpdateBook(queryRunner: QueryRunner, bookId: number) {
    return await queryRunner.manager
      .withRepository(this.booksRepository)
      .createQueryBuilder()
      .update(Book)
      .set({ availableQuantity: () => 'availableQuantity - 1' })
      .where('id = :id', { id: bookId })
      .execute();
  }

  private handleBorrowingError(err: Error) {
    if (err.message.includes('foreign key constraint')) {
      throw new NotFoundException(
        'Borrower or book with the given id does not exist',
      );
    } else if (err.message.includes(BOOK_AVAILABLITY_CONSTRAIN)) {
      throw new BadRequestException('Book is not available');
    } else {
      throw err;
    }
  }

  private checkDueDateIsAfterCheckoutDate(
    dueOutDate: Date,
    checkoutDate: Date,
  ) {
    if (dueOutDate <= checkoutDate)
      throw new BadRequestException('Due date must be after checkout date');
  }
}
