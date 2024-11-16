import {
  Entity, Column,
  PrimaryColumn,
  OneToMany,
} from 'typeorm';
// eslint-disable-next-line import/no-cycle
import Todo from './Todo';

/**
 * Specifically implemented binary storage for id.
 * https://dev.mysql.com/blog-archive/storing-uuid-values-in-mysql-tables/
 */

@Entity('users')
export default class User {
  @PrimaryColumn('binary', { length: 16 })
    Id!: Buffer;

  @Column('char', { length: 36 })
    ExternalId!: string;

  @Column('longtext')
    UserName!: string;

  @Column('longtext')
    FirstName!: string;

  @Column('longtext')
    FamilyName!: string;

  @Column('longtext')
    Email!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    CreatedDate!: Date;

  @OneToMany(() => Todo, (todo) => todo.UserId)
    todos!: Todo[];
}
