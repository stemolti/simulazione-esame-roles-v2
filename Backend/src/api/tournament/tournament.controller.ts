import { Request, Response } from 'express';
import { UserModel } from '../user/user.model';

export class TournamentController {
  async register(req: Request, res: Response) {
    const userId = (req as any).user.id;
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { registeredForTournament: true },
      { new: true },
    );
    res.json(user);
  }

  async setOrganizer(req: Request, res: Response) {
    const userId = (req as any).user.id;
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { tournamentOrganizer: true },
      { new: true },
    );
    res.json(user);
  }
}
