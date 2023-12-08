import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { BorrowersService } from './borrowers.service';
import { CreateBorrowerDto } from './dto/create-borrower.dto';
import { UpdateBorrowerDto } from './dto/update-borrower.dto';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';

/**
 * Controller for managing borrowers.
 */
@ApiTags('Borrowers')
@Controller('borrowers')
export class BorrowersController {
  constructor(private readonly borrowersService: BorrowersService) {}

  /**
   * Create a new borrower.
   * @param createBorrowerDto - The data for creating a borrower.
   * @returns The created borrower.
   */
  @Post()
  @ApiBadRequestResponse({ description: 'Bad Request' })
  create(@Body() createBorrowerDto: CreateBorrowerDto) {
    return this.borrowersService.create(createBorrowerDto);
  }

  /**
   * Get all borrowers.
   * @returns All borrowers.
   */
  @Get()
  findAll() {
    return this.borrowersService.findAll();
  }

  /**
   * Update a borrower by ID.
   * @param id - The ID of the borrower to update.
   * @param updateBorrowerDto - The data for updating the borrower.
   * @returns The updated borrower.
   */
  @Patch(':id')
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Borrower not found' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBorrowerDto: UpdateBorrowerDto,
  ) {
    return this.borrowersService.update(+id, updateBorrowerDto);
  }

  /**
   * Remove a borrower by ID.
   * @param id - The ID of the borrower to remove.
   * @returns The removed borrower.
   */
  @Delete(':id')
  @ApiNotFoundResponse({ description: 'Borrower not found' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.borrowersService.remove(+id);
  }
}
