import express, { Express } from 'express';
import AdminController from './controllers/AdminController';
import UsersController from './controllers/UsersController';
import { createSecret, userAuthVerification } from './services/auth/userAuth';
import 'reflect-metadata';
import './data';

const app: Express = express();
const port = 3000;
// Create single run use secret
// This is for example purposes only
createSecret();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// For sake of example, the admin controller has no auth.
// it exists as a means to quickly create a user
app.use('/admin', AdminController);
app.use('/user', userAuthVerification, UsersController);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
