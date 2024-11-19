import { Router } from 'express';
import z from 'zod';
import { createUser } from '../services/userService';
import { PostUserRequestSchema } from '../models/requests/PostUserRequest';
import { createUserToken } from '../services/auth/userAuth';

const router = Router();

const TokenQuerySchema = z.object({
  userId: z.string(),
});

router.get('/token', async (req, res) => {
  try {
    const { userId } = TokenQuerySchema.parse(req.query);
    const token = await createUserToken(userId);
    res.status(200).send(token);
  } catch (e) {
    console.error(JSON.stringify(e));
    res.status(400).send();
  }
});

router.post('/user', async (req, res) => {
  try {
    const user = PostUserRequestSchema.parse(req.body);
    const createdUser = await createUser(user);
    res.status(200).send(createdUser);
  } catch (e) {
    console.error(JSON.stringify(e));
    res.status(400).send();
  }
});

export default router;
