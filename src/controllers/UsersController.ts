import { Router } from 'express';
import { getUserId } from '../services/auth/header/authHeader';
import { findUser } from '../services/userService';

const router = Router();

router.get('', async (req, res) => {
  try {
    const userId = getUserId(req);
    const user = await findUser(userId);
    res.status(200).send(user);
  } catch {
    res.status(401).send();
  }
});

export default router;
