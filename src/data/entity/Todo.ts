import {
  Entity, Column,
  ManyToOne,
  PrimaryColumn,
  JoinColumn,
} from 'typeorm';
// eslint-disable-next-line import/no-cycle
import User from './User';

@Entity('todos')
export default class Todo {
  @PrimaryColumn('binary', { length: 16 })
    Id!: string;

  @ManyToOne(() => User, (user) => user.todos, { nullable: false })
  @JoinColumn({ name: 'UserId' })
    UserId!: string;

  @Column('longtext')
    Name!: string;

  @Column('boolean', { default: false })
    IsComplete!: boolean;

  @Column({ type: 'datetime', width: 6 })
    CompletedDate!: string;

  @Column({ type: 'datetime', width: 6 })
    CreatedDate!: number;
}
