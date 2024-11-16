import { Router } from 'express';
import { getUserId } from '../services/auth/header/authHeader';
import { createUser, findUser } from '../services/userService';
import { PostUserRequestSchema } from '../models/requests/PostUserRequest';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const userId = getUserId(req);
    const user = await findUser(userId);
    res.status(200).send(user);
  } catch {
    res.status(401).send();
  }
});

router.post('', async (req, res) => {
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
