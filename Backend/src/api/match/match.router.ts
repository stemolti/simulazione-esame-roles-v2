import { Router } from 'express';
import { MatchController } from './match.controller';
import { isAuthenticated, isOrganizer } from '../../utils/auth/authenticated-middleware';

const router = Router();
const controller = new MatchController();

router.get('/', isAuthenticated, controller.getAll);
router.post('/', isAuthenticated, controller.create);
router.put('/:id', isAuthenticated, controller.update);
router.delete('/:id', isAuthenticated, controller.delete);

export default router;
