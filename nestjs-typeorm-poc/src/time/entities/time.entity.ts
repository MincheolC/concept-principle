import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('times')
export class Time {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime' })
  eventDatetime: Date;

  @Column({ type: 'timestamp' })
  eventTimestamp: Date;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp' })
  updatedAt: Date;
}
