import { DataSource } from 'typeorm';
import User from './entity/User';
import Todo from './entity/Todo';

const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3307,
  username: process.env.TODO_USER_DB_ID,
  password: process.env.TODO_USER_DB_PW,
  database: 'node_todo',
  logging: ['query', 'error'],
  entities: [User, Todo],
  migrations: ['dist/data/migrations/**/*.js'],
  synchronize: false,
  subscribers: [],
});
AppDataSource.initialize();
export default AppDataSource;

export const userRepository = AppDataSource.getRepository(User);
export const todoRepository = AppDataSource.getRepository(Todo);
