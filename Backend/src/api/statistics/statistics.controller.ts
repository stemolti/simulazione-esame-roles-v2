import { Request, Response } from 'express';
import { StatisticsService } from './statistics.service';

const service = new StatisticsService();

export class StatisticsController {
  async getEventStats(req: Request, res: Response) {
    try {
      const { from, to } = req.query;

      const fromDate = from ? new Date(from as string) : new Date('1970-01-01');
      const toDate = to ? new Date(to as string) : new Date('2100-12-31');

      const stats = await service.getEventStatistics(fromDate, toDate);
      res.json(stats);
    } catch (err) {
      res
        .status(500)
        .json({ message: err instanceof Error ? err.message : err });
    }
  }
}
