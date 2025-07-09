import { Router } from 'express';
import { confirmEmail, list, me, updatePassword } from './user.controller';
import { isAuthenticated } from '../../utils/auth/authenticated-middleware';

const router = Router();

router.get('/me', isAuthenticated, me);
router.post('/email-confirmation', (req, res, next) => {
  confirmEmail(req, res, next).catch(next);
});
router.patch('/updatePassword', isAuthenticated, updatePassword);
router.get('/users', list);
export default router;
