import { Router } from 'express';
import {
  list,
  me,
} from './user.controller';
import { isAuthenticated } from '../../utils/auth/authenticated-middleware';

const router = Router();


router.get('/users', list);
router.get('/me', isAuthenticated, me);

export default router;