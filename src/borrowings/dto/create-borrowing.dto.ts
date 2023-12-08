import { IsDate, IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBorrowingDto {
  @IsNotEmpty()
  @IsNumber()
  book_id: number;

  @IsNotEmpty()
  @IsNumber()
  borrower_id: number;

  @IsDateString()
  checkOutDate: Date;

  @IsDateString()
  dueDate: Date;
}
