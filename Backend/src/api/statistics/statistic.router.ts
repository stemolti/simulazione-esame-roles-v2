import { Router } from 'express';
import { StatisticsController } from './statistics.controller';
import {
  isAuthenticated,
  isOrganizer,
} from '../../utils/auth/authenticated-middleware';

const router = Router();
const controller = new StatisticsController();

router.get('/events', isAuthenticated, isOrganizer, controller.getEventStats);

export default router;
