import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsNotEmpty()
  @IsString()
  ISBN: string;

  @IsNotEmpty()
  @IsNumber()
  availableQuantity: number;

  @IsNotEmpty()
  @IsString()
  shelfLocation: string;
}
