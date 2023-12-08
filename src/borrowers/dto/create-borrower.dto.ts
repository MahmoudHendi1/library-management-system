import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateBorrowerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
