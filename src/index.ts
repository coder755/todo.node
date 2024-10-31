import express, { Express } from 'express';

const app: Express = express();
const port = 3000;

app.get('/', (_req, res) => {
  res.send('Hello World! huzzah!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
