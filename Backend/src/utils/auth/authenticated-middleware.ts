import passport from 'passport';
import { Request, Response, NextFunction } from 'express';

export const isAuthenticated = passport.authenticate('jwt', { session: false });

export function isOrganizer(req: Request, res: Response, next: NextFunction) {
  const user = req.user!;

  if (!user) {
    res.status(401).json({ message: 'Utente non autenticato' });
    return;
  }

  if (user.role !== 'organizzatore') {
    res.status(403).json({ message: 'Accesso riservato agli organizzatori' });
    return;
  }

  next();
}
