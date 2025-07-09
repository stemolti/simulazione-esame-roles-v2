import { Router } from 'express';
import { EventController } from './event.controller';
import {
  isAuthenticated,
  isOrganizer,
} from '../../utils/auth/authenticated-middleware';

const router = Router();
const controller = new EventController();

router.get('/', isAuthenticated, controller.getAll);
router.get('/:id', isAuthenticated, controller.getById);

router.post('/', isAuthenticated, isOrganizer, controller.create);
router.put('/:id', isAuthenticated, isOrganizer, controller.update);
router.delete('/:id', isAuthenticated, isOrganizer, controller.delete);

export default router;
