import express, { Express } from 'express';
import UsersController from './controllers/UsersController';
import { userAuthVerification } from './services/auth/userAuth';
import 'reflect-metadata';
import './data';

const app: Express = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userAuthVerification, UsersController);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
