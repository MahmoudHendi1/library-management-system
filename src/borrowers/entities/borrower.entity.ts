import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Borrower {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  registeredDate: Date;
}
