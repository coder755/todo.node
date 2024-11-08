import express, { Express } from 'express';
// import NotificationController from './controllers/NotificationController';
import UsersController from './controllers/UsersController';
import { userAuthVerification } from './services/auth/userAuth';

const app: Express = express();
const port = 3000;

// app.use('/notification', NotificationController);
app.use('/user', userAuthVerification, UsersController);

app.get('/', (_req, res) => {
  res.send('Hello World! huzzah!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
