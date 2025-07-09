import { Router } from 'express';
import {
  list,
} from './user.controller';

const router = Router();


router.get('/users', list);

export default router;