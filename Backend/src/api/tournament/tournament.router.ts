import { Router } from 'express';
import { TournamentController } from './tournament.controller';
import { isAuthenticated } from '../../utils/auth/authenticated-middleware';

const router = Router();
const controller = new TournamentController();

router.post('/subscribe', isAuthenticated, controller.register);
router.post('/iam-an-organizer', isAuthenticated, controller.setOrganizer);

export default router;
