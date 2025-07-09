import { Router } from 'express';
import { RegistrationController } from './registration.controller';
import {
  isAuthenticated,
  isOrganizer,
} from '../../utils/auth/authenticated-middleware';

const router = Router();
const controller = new RegistrationController();

router.post('/', isAuthenticated, controller.register);
router.get('/mine', isAuthenticated, controller.getMyRegistrations);

router.get(
  '/user/:userId',
  isAuthenticated,
  isOrganizer,
  controller.getUserRegistrations,
);
router.get('/check/:eventId', isAuthenticated, controller.checkRegistration);
router.delete('/:eventId', isAuthenticated, controller.unregister);

router.post(
  '/checkin/:userId/:eventId',
  isAuthenticated,
  isOrganizer,
  controller.checkin,
);

export default router;
