import { Router } from 'express';
import { isAuthenticated } from '../../utils/auth/authenticated-middleware';
import { UserModel } from '../user/user.model';

const router = Router();

router.get('/', isAuthenticated, async (_req, res) => {
  res.json(await UserModel.find({ registeredForTournament: true }));
});

export default router;
