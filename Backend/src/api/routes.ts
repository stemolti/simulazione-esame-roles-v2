import { Router } from 'express';
import userRouter from './user/user.router';
import authRouter from './auth/auth.router';
import matchRouter from './match/match.router';
import tournamentRouter from './tournament/tournament.router';
import partecipantsRouter from './partecipants/partecipants.router';
const router = Router();

router.use('/', userRouter);
router.use('/match', matchRouter);
router.use('/tournament', tournamentRouter);
router.use('/partecipants', partecipantsRouter);
router.use('/users', authRouter);

export default router;
