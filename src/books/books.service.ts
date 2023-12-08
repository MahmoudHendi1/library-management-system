import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

/**
 * Service responsible for managing books.
 */
@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  /**
   * Creates a new book.
   * @param createBookDto - The data for creating a book.
   * @returns The created book.
   */
  create(createBookDto: CreateBookDto) {
    return this.booksRepository.save(createBookDto);
  }

  /**
   * Retrieves all books.
   * @returns An array of books.
   */
  findAll() {
    return this.booksRepository.find();
  }

  /**
   * Searches for books based on a query.
   * @param query - The search query.
   * @returns An array of books matching the query.
   */
  searchBooks(query: string) {
    return this.booksRepository.find({
      where: [
        { title: Like(`%${query}%`) },
        { author: Like(`%${query}%`) },
        { ISBN: Like(`%${query}%`) },
      ],
    });
  }

  /**
   * Updates a book.
   * @param id - The ID of the book to update.
   * @param updateBookDto - The data for updating the book.
   * @returns The updated book.
   * @throws NotFoundException if the book with the specified ID is not found.
   */
  async update(id: number, updateBookDto: UpdateBookDto) {
    const bookToUpdate = await this.findOneById(id);

    if (!bookToUpdate) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }

    const updatedEntity = {
      ...bookToUpdate,
      ...updateBookDto,
    };

    const book = await this.booksRepository.save(updatedEntity);

    return book;
  }

  /**
   * Removes a book.
   * @param id - The ID of the book to remove.
   * @returns An object indicating if the book was deleted successfully.
   * @throws NotFoundException if the book with the specified ID is not found.
   */
  async remove(id: number) {
    const deleteResult = await this.booksRepository.delete({ id });
    if (!deleteResult.affected) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    return { deleted: true };
  }

  /**
   * Retrieves a book by its ID.
   * @param id - The ID of the book.
   * @returns The found book.
   */
  private findOneById(id: number) {
    return this.booksRepository.findOneBy({ id });
  }
}
