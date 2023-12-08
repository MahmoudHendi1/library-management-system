import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { ThrottlerGuard } from '@nestjs/throttler';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';

/**
 * Controller for managing books.
 */
@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  /**
   * Create a new book.
   * @param createBookDto - The data for creating a book.
   * @returns The created book.
   */
  @UseGuards(ThrottlerGuard)
  @Post()
  @ApiBadRequestResponse({ description: 'Bad Request' })
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  /**
   * Get all books.
   * @returns All books.
   */
  @UseGuards(ThrottlerGuard)
  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  /**
   * Search books by query.
   * @param query - The search query.
   * @returns The matching books.
   */
  @Get('search')
  async searchBooks(@Query('query') query: string): Promise<Book[]> {
    return this.booksService.searchBooks(query);
  }

  /**
   * Update a book by ID.
   * @param id - The ID of the book to update.
   * @param updateBookDto - The data for updating the book.
   * @returns The updated book.
   */
  @Patch(':id')
  @ApiNotFoundResponse({ description: 'Book with id ${id} not found`' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return this.booksService.update(+id, updateBookDto);
  }

  /**
   * Remove a book by ID.
   * @param id - The ID of the book to remove.
   * @returns The removed book.
   */
  @Delete(':id')
  @ApiNotFoundResponse({ description: 'Book with id ${id} not found`' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.remove(+id);
  }
}
