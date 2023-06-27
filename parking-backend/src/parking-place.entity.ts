import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ParkingPlace {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  occupied: boolean;
}