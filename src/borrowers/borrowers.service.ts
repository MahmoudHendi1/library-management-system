import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBorrowerDto } from './dto/create-borrower.dto';
import { UpdateBorrowerDto } from './dto/update-borrower.dto';
import { Borrower } from './entities/borrower.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BorrowersService {
  constructor(
    @InjectRepository(Borrower)
    private borrowersRepository: Repository<Borrower>,
  ) {}

  /**
   * Creates a new borrower.
   * @param createBorrowerDto The data for creating a new borrower.
   * @returns The created borrower.
   */
  create(createBorrowerDto: CreateBorrowerDto) {
    return this.borrowersRepository.save(createBorrowerDto);
  }

  /**
   * Retrieves all borrowers.
   * @returns An array of all borrowers.
   */
  findAll() {
    return this.borrowersRepository.find();
  }

  /**
   * Retrieves a borrower by ID.
   * @param id The ID of the borrower to retrieve.
   * @returns The borrower with the specified ID.
   */
  findOneById(id: number) {
    return this.borrowersRepository.findOneBy({ id });
  }

  /**
   * Updates a borrower by ID.
   * @param id The ID of the borrower to update.
   * @param updateBorrowerDto The data for updating the borrower.
   * @returns The updated borrower.
   * @throws NotFoundException if the borrower with the specified ID is not found.
   */
  async update(id: number, updateBorrowerDto: UpdateBorrowerDto) {
    const borrowerToUpdate = await this.findOneById(id);

    if (!borrowerToUpdate) {
      throw new NotFoundException(`Borrower with id ${id} not found`);
    }

    const updatedEntity = {
      ...borrowerToUpdate,
      ...updateBorrowerDto,
    };

    const book = await this.borrowersRepository.save(updatedEntity);

    return book;
  }

  /**
   * Removes a borrower by ID.
   * @param id The ID of the borrower to remove.
   * @returns An object indicating whether the borrower was successfully deleted.
   * @throws NotFoundException if the borrower with the specified ID is not found.
   */
  async remove(id: number) {
    const deleteResult = await this.borrowersRepository.delete({ id });
    if (!deleteResult.affected) {
      throw new NotFoundException(`Borrower with id ${id} not found`);
    }
    return { deleted: true };
  }
}
