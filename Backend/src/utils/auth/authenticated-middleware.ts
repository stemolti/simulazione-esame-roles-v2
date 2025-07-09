import passport from 'passport';
import { Request, Response, NextFunction } from 'express';
import { User } from '../../api/user/user.entity';
export const isAuthenticated = passport.authenticate('jwt', { session: false });

export function isOrganizer(req: Request, res: Response, next: NextFunction) {
  const user = req.user as User | undefined;

  if (!user) {
    res.status(401).json({ message: 'User not authenticated' });
    return;
  }

  if (!user.tournamentOrganizer) {
    res.status(403).json({ message: 'Access restricted to organizers only' });
    return;
  }

  next();
}
