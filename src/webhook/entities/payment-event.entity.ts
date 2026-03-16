import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity('payment_events')
@Index(['reference'], { unique: true })
export class PaymentEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reference: string;

  @Column()
  event: string;

  @Column('jsonb')
  data: any;

  @Column({ default: false })
  processed: boolean;

  @Column({ nullable: true })
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}
