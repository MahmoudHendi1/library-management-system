import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { BorrowingsService } from './borrowings.service';
import { CreateBorrowingDto } from './dto/create-borrowing.dto';
import {
  ApiTags,
  ApiResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

/**
 * Controller for managing borrowings.
 */
@ApiTags('Borrowings')
@Controller('borrowings')
export class BorrowingsController {
  constructor(private readonly borrowingsService: BorrowingsService) {}

  /**
   * Create a new borrowing.
   * @param createBorrowingDto - The borrowing data.
   * @returns The created borrowing.
   */
  @Post()
  @ApiResponse({
    status: 201,
    description: 'The borrowing has been successfully created.',
  })
  @ApiBadRequestResponse({ description: 'Invalid borrowing data.' })
  create(@Body() createBorrowingDto: CreateBorrowingDto) {
    return this.borrowingsService.create(createBorrowingDto);
  }

  /**
   * Return a borrowing.
   * @param id - The ID of the borrowing to return.
   * @returns The returned borrowing.
   */
  @Post('return/:id')
  @ApiResponse({
    status: 200,
    description: 'The borrowing has been successfully returned.',
  })
  @ApiNotFoundResponse({ description: 'Borrowing not found.' })
  return(@Param('id', ParseIntPipe) id: number) {
    return this.borrowingsService.return(+id);
  }

  /**
   * Find a borrowed item.
   * @param id - The ID of the borrowed item.
   * @returns The borrowed item.
   */
  @Get('borrowed/:id')
  @ApiResponse({
    status: 200,
    description: 'The borrowed item has been successfully found.',
  })
  @ApiNotFoundResponse({ description: 'Borrowed item not found.' })
  findBorrowed(@Param('id', ParseIntPipe) id: number) {
    return this.borrowingsService.findBorrowed(+id);
  }

  /**
   * Find all overdue borrowings.
   * @returns All overdue borrowings.
   */
  @Get('overdue')
  @ApiResponse({
    status: 200,
    description: 'All overdue borrowings have been successfully found.',
  })
  findOverdue() {
    return this.borrowingsService.findOverdue();
  }

  /**
   * Find all borrowings.
   * @returns All borrowings.
   */
  @Get()
  @ApiResponse({
    status: 200,
    description: 'All borrowings have been successfully found.',
  })
  findAll() {
    return this.borrowingsService.findAll();
  }
}
