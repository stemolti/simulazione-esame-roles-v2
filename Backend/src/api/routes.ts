import { Router } from 'express';
import userRouter from './user/user.router';
import authRouter from './auth/auth.router';
import eventRouter from './event/event.router';
import registrationRouter from './registration/registration.router';
import statisticRouter from './statistics/statistic.router';

const router = Router();

router.use('/users', userRouter);
router.use('/events', eventRouter);
router.use('/registration', registrationRouter);
router.use('/statistics', statisticRouter);

router.use(authRouter);

export default router;
