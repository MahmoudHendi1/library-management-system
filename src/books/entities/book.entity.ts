import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeUpdate,
  Check,
} from 'typeorm';

export const BOOK_AVAILABLITY_CONSTRAIN = 'BOOK_AVAILABLITY_CONSTRAIN';

@Entity()
@Check(BOOK_AVAILABLITY_CONSTRAIN, '"availableQuantity" >= 0')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  ISBN: string;

  @Column()
  availableQuantity: number;

  @Column()
  shelfLocation: string;
}
